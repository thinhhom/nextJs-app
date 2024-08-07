"use client";

import Link from 'next/link';
import React from 'react';
import { useEffect, useState } from "react";
import "@/../../public/css/profile.css";
import { useForm } from 'react-hook-form';

export default function Profile() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    // Lấy token từ cookie ở browser
    const token = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
    const tokenValue = token?.split('=')[1];
    if (!tokenValue) {
        window.location.href = '/login';
    }

    // Lấy thông tin user bằng token
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState('');

    const getUser = async () => {
        const res = await fetch('http://localhost:3000/detailuser', {
            headers: {
                Authorization: `Bearer ${tokenValue}`,
            },
        });
        const data = await res.json();
        setUser(data);
        setUserId(data._id);
        // Đặt giá trị ban đầu cho form
        setValue('fullName', data.fullName);
        setValue('phone', data.phone);
        setValue('email', data.email);
        setValue('address', data.address);
    };

    useEffect(() => {
        getUser();
    }, [tokenValue]);

    // Xử lý gửi form
    const onSubmit = async (data) => {
        const token = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
        const tokenValue = token?.split('=')[1];

        const res = await fetch(`http://localhost:3000/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenValue}`,
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();
        if (result) {
            alert('Thông tin đã được cập nhật');
            // Cập nhật lại thông tin người dùng sau khi cập nhật thành công
                getUser();
        } else {
            alert('Cập nhật thông tin thất bại');
        }
    };

    return (
        <>
            <div class="container mt-4 mb-5">
                <div class="box-shadow-wrapper">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="sub-action">
                                <div class="top-action mb-3">
                                    <div class="order-sidemenu__user">
                                        <div class="order-sidemenu__user-avatar">
                                            <img src="https://pubcdn.ivymoda.com/ivy2//images/v2/assets/user-avatar-placeholder.png" alt="" class="img-fluid rounded-circle" />
                                        </div>
                                        <div class="order-sidemenu__user-name">
                                            <p class="text-center">{user.fullName}</p>
                                        </div>
                                    </div>
                                </div>
                                <ul class="list-unstyled custom-list">
                                    <li><a href="/info" class="d-flex align-items-center"><i class="fa fa-user"></i>Thông tin tài khoản</a></li>
                                    <li><a href="#" class="d-flex align-items-center"><i class="fa fa-refresh"></i>Quản lý đơn hàng</a></li>
                                    <li><a href="#" class="d-flex align-items-center"><i class="fa fa-map-marker"></i>Địa chỉ</a></li>
                                    <li><a href="#" class="d-flex align-items-center"><i class="fa fa-heart"></i>Sản phẩm yêu thích</a></li>
                                </ul>
                            </div>
                        </div>

                        <div class="col-md-9">
                            <form class="form" onSubmit={handleSubmit(onSubmit)}>
                                <div class="mb-4">
                                    <h3 class="order-block__title">TÀI KHOẢN CỦA TÔI</h3>
                                    <p class="alert alert-primary">"Vì chính sách an toàn thẻ, bạn không thể thay đổi SĐT, Ngày sinh, Họ tên. Vui lòng liên hệ CSKH 0968575978 để được hỗ trợ"</p>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <div class="form-group">
                                            <label for="username" class="form-label">Họ và tên</label>
                                            <input id="username" name="fullName" type="text" placeholder="Họ và tên" class="form-control" {...register('fullName')}/>
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <div class="form-group">
                                            <label for="dateOfBirth" class="form-label">Số điện thoại</label>
                                            <input id="dateOfBirth" name="phone" type="text" placeholder="Số điện thoại" class="form-control" {...register('phone')}/>
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-3">
                                        <div class="form-group">
                                            <label for="email" class="form-label">Email</label>
                                            <input id="email" name="email" type="text" placeholder="Email" class="form-control" {...register('email')}/>
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-3">
                                        <div class="form-group">
                                            <label for="address" class="form-label">Địa chỉ</label>
                                            <input id="address" name="address" type="text" placeholder="Địa chỉ..." class="form-control" {...register('address')}/>
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-3 d-flex justify-content-between">
                                        <button class="btn btn-primary" type="submit">Cập nhật</button>
                                        <a href="/changePassword" class="btn btn-outline-secondary">Đổi mật khẩu</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}