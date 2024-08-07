"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "Yup";

export default function ChangePassword() {
    const validationSchema = Yup.object({
        currentPassword: Yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
        newPassword: Yup.string()
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ và số')
            .required('Vui lòng nhập mật khẩu mới'),
        rePassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không khớp')
            .required('Vui lòng nhập lại mật khẩu'),
    });

    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            rePassword: "",
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            const token = document.cookie.split(';').find(c => c.trim().startsWith('token='));
            const tokenValue = token?.split('=')[1];
            if (!tokenValue) {
                alert('Vui lòng đăng nhập lại');
                return;
            }

            try {
                const res = await fetch('http://localhost:3000/changePassword', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${tokenValue}`,
                    },
                    body: JSON.stringify({
                        currentPassword: values.currentPassword,
                        newPassword: values.newPassword,
                    }),
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    if (res.status === 400 && errorData.message === "Mật khẩu hiện tại không đúng") {
                        setFieldError('currentPassword', 'Mật khẩu hiện tại không đúng');
                    } else {
                        throw new Error(errorData.message || 'Cập nhật mật khẩu thất bại');
                    }
                }else{
                    alert("Cập nhật mật khẩu thành công!")
                    router.push("/profile");
                }
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
                        <li className="breadcrumb-item"><a href="#">Profile</a></li>
                        <li className="breadcrumb-item active">Change Password</li>
                    </ul>
                </div>
            </div>


            <div className="login">
                <div className="container">
                    <div className="section-header">
                        <h3>Đổi mật khẩu</h3>
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <form id="change-password-form" onSubmit={formik.handleSubmit}>
                                    <div className="login-form">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label htmlFor="current-password">Mật khẩu hiện tại</label>
                                                <input id="current-password" className="form-control custom-input" type="password"
                                                    name="currentPassword" placeholder="Nhập mật khẩu hiện tại"
                                                    {...formik.getFieldProps('currentPassword')}
                                                />
                                                {formik.touched.currentPassword && formik.errors.currentPassword ? (<div className="text-danger" style={{ marginTop: '-10px' }}>{formik.errors.currentPassword}</div>) : null}
                                                {formik.errors.general ? (<div className="text-danger" style={{ marginTop: '-10px' }}>{formik.errors.general}</div>) : null}
                                            </div>
                                            <div className="col-md-12 mt-2">
                                                <label htmlFor="new-password">Mật khẩu mới</label>
                                                <input id="new-password" className="form-control custom-input" type="password"
                                                    name="newPassword" placeholder="Nhập mật khẩu mới"
                                                    {...formik.getFieldProps('newPassword')}
                                                />
                                                {formik.touched.newPassword && formik.errors.newPassword ? (<div className="text-danger" style={{ marginTop: '-10px' }}>{formik.errors.newPassword}</div>) : null}
                                            </div>
                                            <div className="col-md-12 mt-2">
                                                <label htmlFor="confirm-password">Xác nhận mật khẩu mới</label>
                                                <input id="confirm-password" className="form-control custom-input" type="password"
                                                    name="rePassword" placeholder="Nhập lại mật khẩu mới"
                                                    {...formik.getFieldProps('rePassword')}
                                                />
                                                {formik.touched.rePassword && formik.errors.rePassword ? (<div className="text-danger" style={{ marginTop: '-10px' }}>{formik.errors.rePassword}</div>) : null}
                                            </div>
                                            <div className="col-md-12 mt-2">
                                                <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>Cập nhật</button>
                                            </div>
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