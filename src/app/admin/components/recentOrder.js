"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

export default function RecentOrder() {
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

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('vi-VN');
    }

    // Lọc các đơn hàng để chỉ hiển thị các đơn hàng chưa giao thành công
    const filteredOrders = data.filter(order => order.status !== 'Đã giao thành công');

    return (
        <>
            <div className="col-md-4 mb-3">
                <div className="card rounded-0 border-0 shadow-sm">
                    <div className="card-body">
                        <div className="d-flex border-bottom pb-2 justify-content-between">
                            <h6 className="mb-0">
                                <i className="fal fa-file-invoice-dollar fa-lg me-2"></i>
                                Đơn hàng gần đây
                            </h6>
                            <small>
                                <Link href="/admin/order" className="text-decoration-none">Tất cả đơn hàng</Link>
                            </small>
                        </div>
                        {filteredOrders.map((order) => (
                            <div className="d-flex text-body-secondary pt-3" key={order._id}>
                            <div className={`p-2 me-2 ${
                                order.status === 'Đã hủy' ? 'bg-danger' :
                                order.status === 'Chờ xác nhận' ? 'bg-warning' :
                                order.status === 'Đã xác nhận' || order.status === 'Đang vận chuyển'  ? 'bg-success' :
                                ''
                            } text-white`}>
                                <i className="fal fa-receipt"></i>
                            </div>
                            <Link href="#" className="py-2 mb-0 small lh-sm border-bottom w-100 text-decoration-none text-body-secondary">
                                <strong className="d-flex justify-content-between">
                                    Đơn #{order._id}
                                    <div>
                                        <span className="badge bg-success-subtle text-success"><i className="far fa-money-bill-wave"></i>
                                        {order.detail.reduce((sum, item) =>
                                        sum + item.price* item.quantity, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        </span>
                                    </div>
                                </strong>
                                Đặt bởi <i>{order.user.fullName}</i> lúc {formatTime(order.createAt)}  |  {formatDate(order.createAt)}
                            </Link>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}