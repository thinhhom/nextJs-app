"use client"
import { useFormik } from 'formik';
import * as Yup from 'Yup';


export default function Login() {
    const validationSchema = Yup.object({
        email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
        password: Yup.string().required('Vui lòng nhập mật khẩu'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                const res = await fetch('http://localhost:3000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: values.email,
                        password: values.password
                    }),
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || 'Đăng nhập thất bại');
                }
                // Lưu token vào cookie
                const data = await res.json();
                // localStorage.setItem('token', data.token);
                document.cookie = `token=${data.token}; path=/; max-age=${60 * 60}`;
                // Chuyển trang theo role
                const token = data.token;
                const payload = JSON.parse(atob(token.split('.')[1]));
                // console.log(payload);
                if (payload.role === "admin") {
                    window.location.href = ('http://localhost:3001/admin');
                } else {
                    alert("Đăng nhập thành công!");
                    window.location.href = '/';
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
                        <li className="breadcrumb-item"><a href="#">User</a></li>
                        <li className="breadcrumb-item active">Login</li>
                    </ul>
                </div>
            </div>


            <div className="login">
                <div className="container">
                    <div className="section-header">
                        <h3>Login</h3>
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
                                                <label htmlFor="emailOrUsername">E-mail</label>
                                                <input id="emailOrUsername" className="form-control custom-input" type="email" name="email" placeholder="Enter your email"
                                                    {...formik.getFieldProps('email')}
                                                />
                                                {formik.touched.email && formik.errors.email ? (<div className="text-danger" style={{ marginTop: '-10px' }}>{formik.errors.email}</div>) : null}
                                            </div>
                                            <div className="col-md-12 mt-2">
                                                <label htmlFor="password">Mật khẩu</label>
                                                <input id="password" className="form-control custom-input" type="password" name="password" placeholder="Enter your password"
                                                    {...formik.getFieldProps('password')}
                                                />
                                                {formik.touched.password && formik.errors.password ? (<div className="text-danger" style={{ marginTop: '-10px' }}>{formik.errors.password}</div>) : null}
                                                {formik.errors.general ? (<div className="text-danger" style={{ marginTop: '-10px' }}>{formik.errors.general}</div>) : null}
                                            </div>
                                            <div className="col-md-12 mt-2">
                                                <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>Đăng nhập</button>
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
