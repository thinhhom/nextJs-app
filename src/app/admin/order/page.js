"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import OrderCount from "../components/orderCount";
import ProductCount from "../components/productCount";
import CustomerCount from "../components/customerCount";
import TotalRevenue from "../components/totalRevenue";

export default function Order() {
    const [data, setData] = useState([]);
    const fetchOrder = async () => {
        const res = await fetch('http://localhost:3000/orders', { cache: 'no-store' });
        const newData = await res.json();
        setData(newData);
        // console.log(newData);
    }

    useEffect(() => {
        fetchOrder();
        // console.log(data);
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Lấy ngày, tháng, năm
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        // Trả về chuỗi ngày theo định dạng dd/mm/yyyy
        return `${day}/${month}/${year}`;
    }

    // const formatTime = (dateString) => {
    //     const date = new Date(dateString);
    //     return date.toLocaleTimeString('vi-VN');
    // }

    return (
        <>
            <div className="container-fluid p-4">
                <div className="d-flex justify-content-between">
                    <h3 className="mb-4">Đơn hàng</h3>
                    <div>
                        <Link href="#" className="btn btn-outline-success rounded-0 me-2">Manage Categories</Link>
                    </div>
                </div>
                <div className="row">
                    <OrderCount></OrderCount>
                    <ProductCount></ProductCount>
                    <CustomerCount></CustomerCount>
                    <TotalRevenue></TotalRevenue>
                </div>

                <div className="card rounded-0 border-0 shadow-sm">
                    <div className="card-body">
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th>Mã đơn hàng</th>
                                    <th className="text-start" colSpan="1">Thông tin khách hàng</th>
                                    <th>Địa chỉ</th>
                                    <th>Ngày đặt hàng</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                {data.map((order) => (
                                    <tr key={order._id}>
                                        <td>#{order._id}</td>
                                        <td className="text-start">
                                            Họ và tên: <strong>{order.user.fullName}</strong>
                                            <br />
                                            <small>
                                                Số điện thoại: <strong>{order.user.phone}</strong><br />
                                                Email: <strong>{order.user.email}</strong>
                                            </small>
                                        </td>
                                        <td style={{ wordWrap: 'break-word', maxWidth: '250px' }}>{order.user.address}</td>
                                        <td>
                                            {formatDate(order.createAt)}
                                        </td>
                                        <td>
                                            <span className={`badge ${order.status === 'Đã hủy' ? 'bg-danger' :
                                                    order.status === 'Chờ xác nhận' ? 'bg-warning' :
                                                        order.status === 'Đã xác nhận' || order.status === 'Đang vận chuyển' || order.status === 'Đã giao thành công' ? 'bg-success' :
                                                            ''
                                                } text-white`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>
                                            <Link href={`/admin/order/orderDetail/${order._id}`} className="btn btn-primary btn-sm me-1">
                                                <i className="fas fa-eye fa-fw"></i>
                                            </Link>
                                            <Link href="" className="btn btn-outline-warning btn-sm me-1">
                                                <i className="fas fa-pencil fa-fw"></i>
                                            </Link>
                                            <Link href="#" className="btn btn-outline-danger btn-sm">
                                                <i className="fas fa-times fa-fw"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    );
}