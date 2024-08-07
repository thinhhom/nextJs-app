"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function OrderDetail({ params }) {
    const router = useRouter();
    const id = params.id;
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [order, setOrder] = useState(null);


    useEffect(() => {
        // Lấy dữ liệu chi tiết đơn hàng cần update
        const getOrder = async () => {
            const res = await fetch(`http://localhost:3000/orders/${id}`);
            const data = await res.json();
            setOrder(data);
            // Dữ liệu chi tiết sản phẩm show ra form
            // Đặt giá trị ban đầu cho form
            setValue('status', data.status);
        };
        if (id) {
            getOrder();
        }
    }, [id, setValue]);

    const onSubmit = async (data) => {
        const res = await fetch(`http://localhost:3000/orders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: data.status }),
        });
        const result = await res.json();
        if (!result.error) {
            router.push('/admin/order');
        } else {
            console.error(result.error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Lấy ngày, tháng, năm
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        // Trả về chuỗi ngày theo định dạng dd/mm/yyyy
        return `${day}/${month}/${year}`;
    }


    return (
        <>
            <div className="container-fluid p-4">
                <div className="d-flex justify-content-between">
                    <h3 className="mb-4">Chi tiết đơn hàng</h3>
                    <div>
                        <Link href="#" className="btn btn-outline-success rounded-0 me-2">Manage Categories</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 mb-4">
                        <div className="card border-0 rounded-0 bg-primary-subtle text-primary">
                            <div className="card-body text-end">
                                <div className="display-6 d-flex justify-content-between">
                                    <i className="fal fa-box"></i>
                                    20
                                </div>
                                PRODUCTS
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="card border-0 rounded-0 bg-danger-subtle text-danger">
                            <div className="card-body text-end">
                                <div className="display-6 d-flex justify-content-between">
                                    <i className="fal fa-box-open"></i>
                                    3
                                </div>
                                RUNNING OUT
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="card border-0 rounded-0 bg-success-subtle text-success">
                            <div className="card-body text-end">
                                <div className="display-6 d-flex justify-content-between">
                                    <i className="fal fa-boxes"></i>
                                    5
                                </div>
                                CATEGORIES
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="card border-0 rounded-0 bg-dark-subtle text-dark">
                            <div className="card-body text-end">
                                <div className="display-6 d-flex justify-content-between">
                                    <i className="fal fa-archive"></i>
                                    0
                                </div>
                                ARCHIVE
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card rounded-0 border-0 shadow-sm">
                    <div className="card-body">
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th className="text-start" colSpan="2">Sản phẩm đơn hàng</th>
                                    <th>Số lượng</th>
                                    <th>Đơn giá</th>
                                    <th>Tổng tiền</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                {order && order.detail.map((order, index) => (
                                    <tr key={order._id}>
                                        <td>{index + 1}</td>
                                        <td style={{ width: 64 + "px" }}>
                                            <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${order.image}`} alt={order.name} className="w-100" />
                                        </td>
                                        <td className="text-start">
                                            <strong>
                                                {order.name}
                                            </strong>
                                            <br />
                                            <small>
                                                Id: <strong>{order._id}</strong> | Size: <strong>{order.size}</strong>
                                            </small>
                                        </td>
                                        <td><strong>{order.quantity} sản phẩm</strong></td>
                                        <td>{order.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                        <td>{(order.price * order.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                        <td>
                                            <Link href="#" className="btn btn-primary btn-sm me-1">
                                                <i className="fas fa-eye fa-fw"></i>
                                            </Link>
                                            <Link href="#" className="btn btn-outline-warning btn-sm me-1">
                                                <i className="fas fa-pencil fa-fw"></i>
                                            </Link>
                                            <Link href="#" className="btn btn-outline-danger btn-sm">
                                                <i className="fas fa-times fa-fw"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {order && (
                                    <>
                                        <tr>
                                            <td colSpan="2">
                                                <strong>Tổng số tiền:</strong>
                                            </td>
                                            <td colSpan="1">
                                                {order.total_money.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                            </td>
                                            <td colSpan="3">
                                                <strong>Ngày đặt hàng:</strong>
                                            </td>
                                            <td colSpan="3">
                                                {formatDate(order.createAt)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">
                                                <strong>Trạng thái đơn hàng:</strong>
                                            </td>
                                            <td colSpan="1">
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    <div className="input-group">
                                                        <select className="form-select rounded-0" {...register('status')}>
                                                            <option value="Chờ xác nhận">Chờ xác nhận</option>
                                                            <option value="Đã xác nhận">Đã xác nhận</option>
                                                            <option value="Đang vận chuyển">Đang vận chuyển</option>
                                                            <option value="Đã giao thành công">Đã giao thành công</option>
                                                            <option value="Đã hủy">Đã hủy</option>
                                                        </select>
                                                    </div>
                                                    <td>
                                                        <button type="submit" className="btn btn-primary mt-2">Cập nhật</button>
                                                    </td>
                                                </form>
                                            </td>
                                            <td colSpan="3">
                                                <strong>Phương thức thanh toán:</strong>
                                            </td>
                                            <td colSpan="3">
                                                {order.paymentMethod}
                                            </td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}