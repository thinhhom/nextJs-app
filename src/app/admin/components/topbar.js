"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Topbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    useEffect(() => {
        const token = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
        // console.log(token);
        const tokenValue = token?.split('=')[1];
        if (token) {
            setIsLoggedIn(true);
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
        }
    }, []);

    const handleLogout = () => {
        // Xóa token bằng cách đặt thời gian hết hạn của cookie là một ngày trước đó
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // Cập nhật trạng thái đăng nhập
        setIsLoggedIn(false);
        // Chuyển hướng về trang chủ hoặc trang đăng nhập
        window.location.href = "/login";
    };
    return (
        <>
            <nav className="navbar navbar-expand-md text-bg-primary" data-bs-theme="dark">
                <div className="container-fluid ps-0">
                    <div className="d-flex justify-content-between w-100">
                        <form className="d-flex w-100" role="search" data-bs-theme="light">
                            <div className="input-group">
                                <button type="submit" className="btn btn-primary rounded-0 border-white">
                                    <i className="far fa-search"></i>
                                </button>
                                <input className="form-control me-2 rounded-0 border-white" type="search" placeholder="Search" />
                            </div>
                        </form>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse w-100" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto" data-bs-theme="light">
                            {isLoggedIn ? (
                                <>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <strong>Xin chào , {user.fullName || 'User'}</strong>
                                        </a>
                                        <ul className="dropdown-menu rounded-0 dropdown-menu-md-end">
                                            <li><Link href="/profile" className="dropdown-item">Profile</Link></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><a className="dropdown-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>Sign out</a></li>
                                        </ul>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item">
                                    <Link href="/login" className="nav-link">Login</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}