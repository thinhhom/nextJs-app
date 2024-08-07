"use client"

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "Yup";

export default function Register() {
    const validationSchema = Yup.object({
        fullName: Yup.string().required("Vui lòng nhập họ tên"),
        email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
        password: Yup.string()
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ và số')
            .required('Vui lòng nhập mật khẩu'),
        rePassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
            .required('Vui lòng nhập lại mật khẩu'),
        phone: Yup.string()
            .required("Vui lòng nhập số điện thoại")
            .matches(
                /^(\+84|0)(\d{9,10})$/,
                "Số điện thoại không hợp lệ"
            ),
        address: Yup.string().required("Vui lòng nhập địa chỉ"),
    });

    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
            address: "",
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                const res = await fetch('http://localhost:3000/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fullName: values.fullName,
                        email: values.email,
                        password: values.password,
                        phone: values.phone,
                        address: values.address
                    }),
                });
                if (!res.ok) {
                    const errorData = await res.json();
                    // console.log(errorData);
                    if (res.status === 400 && errorData.message === "Email đã tồn tại") {
                        // console.log('Setting field error for email');
                        setFieldError('email', 'Email đã tồn tại');
                    } else {
                        throw new Error(errorData.message || 'Đăng ký thất bại');
                    }
                }
                // Xử lý thành công
                alert('Đăng ký thành công');
                router.push("/login");
            } catch (error) {
                setFieldError('general', error.message);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <>
            <div className="breadcrumb-wrap">
                <div className="container">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">User</a></li>
                        <li className="breadcrumb-item active">Register</li>
                    </ul>
                </div>
            </div>


            <div className="login">
                <div className="container">
                    <div className="section-header">
                        <h3>Register</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra at massa sit amet ultricies. Nullam consequat, mauris non interdum cursus
                        </p>
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="login-form">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label>Họ và tên</label>
                                                <input className="form-control" type="text" placeholder="Enter your username"
                                                    {...formik.getFieldProps('fullName')}
                                                />
                                                {formik.touched.fullName && formik.errors.fullName ? (<div className="text-danger" style={{ marginTop: '-10px' }}>{formik.errors.fullName}</div>) : null}
                                            </div>
                                            <div className="col-md-12">
                                                <label>Email</label>
                                                <input className="form-control" type="email" placeholder="Enter your email"
                                                    {...formik.getFieldProps('email')}
                                                />
                                                {formik.touched.email && formik.errors.email ? (<div className="text-danger" style={{ marginTop: '-10px' }}>{formik.errors.email}</div>) : null}                                            </div>
                                            <div className="col-md-12">
                                                <label>Mật khẩu</label>
                                                <input className="form-control" type="password" placeholder="Enter your password"
                                                    {...formik.getFieldProps('password')}
                                                />
                                                {formik.touched.password && formik.errors.password ? (<div className="text-danger" style={{ marginTop: '-10px' }}>{formik.errors.password}</div>) : null}
                                            </div>
                                            <div className="col-md-12">
                                                <label>Nhập lại mật khẩu</label>
                                                <input className="form-control" type="password" placeholder="Enter your password"
                                                    {...formik.getFieldProps('rePassword')}
                                                />
                                                {formik.touched.rePassword && formik.errors.rePassword ? (<div className="text-danger" style={{ marginTop: '-10px' }}>{formik.errors.rePassword}</div>) : null}
                                            </div>
                                            <div className="col-md-12">
                                                <label>Số điện thoại</label>
                                                <input className="form-control" type="text" placeholder="Enter your phone"
                                                    {...formik.getFieldProps('phone')}
                                                />
                                                {formik.touched.phone && formik.errors.phone ? (<div className="text-danger" style={{ marginTop: '-10px' }}>{formik.errors.phone}</div>) : null}
                                            </div>
                                            <div className="col-md-12">
                                                <label>Địa chỉ</label>
                                                <input className="form-control" type="text" placeholder="Enter your address"
                                                    {...formik.getFieldProps('address')}
                                                />
                                                {formik.touched.address && formik.errors.address ? (<div className="text-danger" style={{ marginTop: '-10px' }}>{formik.errors.address}</div>) : null}
                                            </div>
                                            <div className="col-md-12 mt-2">
                                                <button type="submit" className="btn" disabled={formik.isSubmitting}>Đăng ký</button>
                                            </div>
                                            {formik.errors.general && (
                                                <p className="my-3 text-danger">{formik.errors.general}</p>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
