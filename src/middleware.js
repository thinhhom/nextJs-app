import { NextResponse } from 'next/server';

export async function middleware(request) {
    const token = request.cookies.get('token');

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Gọi đến API xác thực token
    const res = await fetch('http://localhost:3000/checktoken', {
        headers: {
            Authorization: `Bearer ${token.value}`,
        },
    });

    const data = await res.json();
    const { role } = data; // Lấy thông tin vai trò từ phản hồi API

    if (role !== "admin") {
        return NextResponse.redirect(new URL('/login', request.url));
    }


    if (!res.ok) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Nếu token hợp lệ, cho phép yêu cầu tiếp tục
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin',
        '/admin/product',
        '/admin/product/add',
        '/admin/product/edit',
        '/admin/categories',
        '/admin/categories/add',
        '/admin/categories/edit',
        '/admin/order',
        '/admin/order/orderDetail'
    ],
};
