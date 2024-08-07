"use client"

import { removeCart } from "@/redux/slices/cartslice";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "Yup";


export default function Checkout() {
    const cart = useSelector((state) => state.cart)
    // console.log(cart)
    const dispatch = useDispatch();
    const total = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart]);
    const totalItem = useMemo(() => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    }, [cart])

    const validationSchema = Yup.object({
        fullName: Yup.string().required("Nhập họ tên là bắt buộc"),
        phone: Yup.string()
            .required("Nhập số điện thoại là bắt buộc")
            .matches(
                /^(\+84|0)(\d{9,10})$/,
                "Số điện thoại không hợp lệ"
            ),
        email: Yup.string()
            .email("Email không hợp lệ")
            .required("Nhập email là bắt buộc "),
        address: Yup.string().required("Nhập địa chỉ là bắt buộc "),
        paymentMethod: Yup.string().required("Vui lòng chọn phương thức thanh toán"),
    });

    // Lấy token từ cookie ở browser
    const token = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
    const tokenValue = token?.split('=')[1];
    // Lấy thông tin user bằng token
    const [user, setUser] = useState({});
    useEffect(() => {
        const getUser = async () => {
            const res = await fetch('http://localhost:3000/detailuser', {
                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                },
            });
            const data = await res.json();
            setUser(data);
        };
        getUser();
    }, [tokenValue]);

    const [formValue, setFormValue] = useState(null);
    const router = useRouter();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            fullName: user.fullName || "",
            phone: user.phone || "",
            email: user.email || "",
            address: user.address || "",
            paymentMethod: "",
            status: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setFormValue(values);
            if(cart.length === 0) {
                alert("Vui lòng có ít nhất 1 sản phẩm để thanh toán !");
                return;
            }

            // Tạo thông tin đơn hàng
            const orderData = {
                user: {
                    fullName: values.fullName,
                    phone: values.phone,
                    email: values.email,
                    address: values.address,
                },
                detail: cart,
                total_money: total,
                paymentMethod: values.paymentMethod,
                status: "Chờ xác nhận",
                createAt: new Date(),
                updateAt: new Date(),
            };

            try {
                const response = await fetch("http://localhost:3000/orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(orderData),
                });

                const data = await response.json();

                if (response.ok) {
                    const orderId = data._id;
                    const orderInfo = "Thanh toán cùng MoMo"

                    if (values.paymentMethod === "Thanh toán online") {
                        const momoResponse = await fetch("http://localhost:3000/api/momo", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                amount: total,
                                orderInfo: orderInfo,
                                orderId: orderId,
                            }),
                        });

                        const momoData = await momoResponse.json();
                        if (momoResponse.ok) {
                            window.location.href = momoData.payUrl;
                            dispatch(removeCart());
                        } else {
                            alert("Lỗi khi tạo yêu cầu thanh toán MoMo: " + momoData.error);
                        }
                    } else {
                        alert("Đặt hàng thành công!");
                        dispatch(removeCart());
                        router.push('/');
                    }
                } else {
                    alert("Lỗi khi lưu đơn hàng: " + orderData.error);
                }
            } catch (error) {
                console.error("Đã xảy ra lỗi:", error);
                alert("Đã xảy ra lỗi. Vui lòng thử lại.");
            }
        }
    });



    return (
        <>
            <div className="breadcrumb-wrap">
                <div className="container">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Products</a></li>
                        <li className="breadcrumb-item active">Checkout</li>
                    </ul>
                </div>
            </div>


            <div className="checkout">
                <div className="container">
                    <form onSubmit={formik.handleSubmit} method="POST">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="billing-address">
                                    <h2>Thông tin nhận hàng</h2>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Họ và tên</label>
                                            <input className="form-control" type="text" placeholder="Họ và tên" name="fullName" id="fullName"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                style={{
                                                    borderColor: formik.touched.fullName && formik.errors.fullName ? 'red' : null,
                                                    borderWidth: formik.touched.fullName && formik.errors.fullName ? '1px' : '1px',
                                                    boxShadow: formik.touched.fullName && formik.errors.fullName ? '0 0 3px rgba(255, 0, 0, 0.6)' : null,

                                                }}
                                                value={formik.values.fullName}
                                            />
                                            {formik.touched.fullName && formik.errors.fullName ? (<div className="text-danger">{formik.errors.fullName}</div>) : null}
                                        </div>
                                        <div className="col-md-6">
                                            <label>Số điện thoại</label>
                                            <input className="form-control" type="text" placeholder="Số điện thoại" name="phone" id="phone"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                style={{
                                                    borderColor: formik.touched.phone && formik.errors.phone ? 'red' : null,
                                                    borderWidth: formik.touched.phone && formik.errors.phone ? '1px' : '1px',
                                                    boxShadow: formik.touched.phone && formik.errors.phone ? '0 0 3px rgba(255, 0, 0, 0.6)' : null,

                                                }}
                                                value={formik.values.phone}
                                            />
                                            {formik.touched.phone && formik.errors.phone ? (<div className="text-danger">{formik.errors.phone}</div>) : null}
                                        </div>
                                        <div className="col-md-12">
                                            <label>E-mail</label>
                                            <input className="form-control" type="email" placeholder="E-mail" name="email" id="email"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                style={{
                                                    borderColor: formik.touched.email && formik.errors.email ? 'red' : null,
                                                    borderWidth: formik.touched.email && formik.errors.email ? '1px' : '1px',
                                                    boxShadow: formik.touched.email && formik.errors.email ? '0 0 3px rgba(255, 0, 0, 0.6)' : null,

                                                }}
                                                value={formik.values.email}
                                            />
                                            {formik.touched.email && formik.errors.email ? (<div className="text-danger">{formik.errors.email}</div>) : null}
                                        </div>
                                        <div className="col-md-12">
                                            <label>Địa chỉ</label>
                                            <input className="form-control" type="text" placeholder="Address" name="address" id="address"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                style={{
                                                    borderColor: formik.touched.address && formik.errors.address ? 'red' : null,
                                                    borderWidth: formik.touched.address && formik.errors.address ? '1px' : '1px',
                                                    boxShadow: formik.touched.address && formik.errors.address ? '0 0 3px rgba(255, 0, 0, 0.6)' : null,

                                                }}
                                                value={formik.values.address}
                                            />
                                            {formik.touched.address && formik.errors.address ? (<div className="text-danger">{formik.errors.address}</div>) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="checkout-summary">
                                    <h3>Đơn hàng ({totalItem} sản phẩm) </h3>
                                    <div className="checkout-content">
                                        <h3>Sản phẩm</h3>
                                        {cart.map((product) => (
                                            <div key={product._id} className="cart-item">
                                                <div className="cart-item-image">
                                                    <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${product.image}`} alt={product.name} width="70" />
                                                </div>
                                                <div className="cart-item-details">
                                                    <p className="product-name">{product.name}</p>
                                                    <p className="product-size">Size: {product.size}</p>
                                                    <p className="product-quantity">Số lượng: {product.quantity}</p>
                                                </div>
                                                <div className="cart-item-price">
                                                    <p className="product-price">{(product.price * product.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                                </div>
                                            </div>
                                        ))}
                                        <p className="sub-total">Tạm tính<span>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></p>
                                        <p className="ship-cost">Phí vận chuyển<span>-</span></p>
                                        <h4>Tổng cộng<span>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></h4>
                                    </div>
                                </div>

                                <div className="checkout-payment">
                                    <h2>Phương thức thanh toán</h2>
                                    <div className="payment-methods">
                                        <div className="payment-method">
                                            <div className="custom-control custom-radio">
                                                <input
                                                    type="radio"
                                                    className="custom-control-input"
                                                    id="payment-1"
                                                    name="paymentMethod"
                                                    value="Thanh toán khi nhận hàng"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                <label className="custom-control-label" htmlFor="payment-1">Thanh toán khi nhận hàng</label>
                                            </div>
                                        </div>
                                        <div className="payment-method">
                                            <div className="custom-control custom-radio">
                                                <input
                                                    type="radio"
                                                    className="custom-control-input"
                                                    id="payment-2"
                                                    name="paymentMethod"
                                                    value="Thanh toán online"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                <label className="custom-control-label" htmlFor="payment-2">Thanh toán online</label>
                                            </div>
                                        </div>
                                    </div>
                                    {formik.touched.paymentMethod && formik.errors.paymentMethod ? (<div className="text-danger mt-1">{formik.errors.paymentMethod}</div>) : null}
                                    <div className="checkout-btn">
                                        <button type="submit">Đặt hàng</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};