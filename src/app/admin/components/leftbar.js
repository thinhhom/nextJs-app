"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Leftbar() {
    const pathname = usePathname();
    return (
        <>
            <ul className="nav nav-pills flex-column mb-auto" data-bs-themes>
                <li className="nav-item">
                    <Link href="/admin" className={`nav-link rounded-4 ${pathname == "/admin" ? 'active' : 'text-white'}`}>
                        <i className="far fa-tachometer-alt-fastest fa-fw me-1"></i>
                        <span className="d-none d-sm-inline-block">Tổng Quan</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/order" className={`nav-link rounded-4 ${pathname == "/admin/order" ? 'active' : 'text-white'}`}>
                        <i className="far fa-shopping-cart fa-fw me-1"></i>
                        <span className="d-none d-sm-inline-block">Đơn Hàng</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/product" className={`nav-link rounded-4 ${pathname == "/admin/product" ? 'active' : 'text-white'}`}>
                        <i className="far fa-boxes fa-fw me-1"></i>
                        <span className="d-none d-sm-inline-block">Sản Phẩm</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/categories" className={`nav-link rounded-4 ${pathname == "/admin/categories" ? 'active' : 'text-white'}`}>
                        <i className="far fa-list fa-fw me-1"></i>
                        <span className="d-none d-sm-inline-block">Danh Mục</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/customer" className={`nav-link rounded-4 ${pathname == "/admin/customer" ? 'active' : 'text-white'}`}>
                        <i className="far fa-users fa-fw me-1"></i>
                        <span className="d-none d-sm-inline-block">Khách Hàng</span>
                    </Link>
                </li>
                {/* <li>
                    <Link href="/admin/rating" className={`nav-link rounded-0 ${pathname == "/admin/rating" ? 'active' : 'text-white'}`}>
                        <i className="far fa-star-half-alt me-1"></i>
                        <span className="d-none d-sm-inline-block">Đánh Giá</span>
                    </Link>
                </li> */}
            </ul>
        </>
    );
}