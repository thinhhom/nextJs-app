"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export default function Header() {
    const router = useRouter();
    const cart = useSelector((state) => state.cart)
    const totalItem = useMemo(() => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    }, [cart])

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
            <div className="top-header">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-3">
                            <div className="logo">
                                <Link href="/">
                                    <img src="/img/logo.png" alt="Logo" width={128} height={47} />
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="search">
                                <form className="d-flex ms-4" action="/search">
                                    <input type="text" name="keyword" placeholder="Tìm kiếm sản phẩm..." />
                                    <button type="submit"><i className="fa fa-search"></i></button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="user">
                                <div className="dropdown">
                                    <Link href="#" className="dropdown-toggle" data-toggle="dropdown">{isLoggedIn && user ? `Xin chào, ${user.fullName}` : 'My Account'}</Link>
                                    <div className="dropdown-menu">
                                        {!isLoggedIn && (
                                            <>
                                                <Link href="/login" className="dropdown-item">Login</Link>
                                                <Link href="/register" className="dropdown-item">Register</Link>
                                            </>
                                        )}
                                        {isLoggedIn && (
                                            <>
                                                <Link href="/profile" className="dropdown-item">Profile</Link>
                                                <Link href="" onClick={handleLogout} className="dropdown-item">Logout</Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="cart">
                                    <Link href="/cart"><i className="fa fa-cart-plus"></i></Link>
                                    <span>({totalItem})</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header">
                <div className="container">
                    <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                        <Link href="#" className="navbar-brand">MENU</Link>
                        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div className="navbar-nav m-auto">
                                <Link href="/" className="nav-item nav-link active">Trang chủ</Link>
                                <Link href="/shop" className="nav-item nav-link">Shop</Link>
                                <div className="nav-item dropdown">
                                    <Link href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Pages</Link>
                                    <div className="dropdown-menu">
                                        <Link href="/product" className="dropdown-item">Product</Link>
                                        <Link href="product-detail.html" className="dropdown-item">Product Detail</Link>
                                        <Link href="/cart" className="dropdown-item">Cart</Link>
                                        <Link href="/checkout" className="dropdown-item">Checkout</Link>
                                        <Link href="/login" className="dropdown-item">Login & Register</Link>
                                        <Link href="my-account.html" className="dropdown-item">My Account</Link>
                                    </div>
                                </div>
                                <Link href="/contact" className="nav-item nav-link">Contact Us</Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}
