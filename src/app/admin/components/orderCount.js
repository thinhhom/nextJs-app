"use client";
import { useEffect, useState } from "react";

export default function OrderCount() {
    const [orderCount, setOrderCount] = useState(0);
    const fetchOrderCount = async () => {
        const res = await fetch('http://localhost:3000/orderCount', { cache: 'no-store' });
        const data = await res.json();
        setOrderCount(data);
    }

    useEffect(() => {
        fetchOrderCount();
    }, []);

    return (
        <>
            <div className="col-md-3 mb-4">
                <div className="card border-0 rounded-0 bg-primary-subtle text-primary">
                    <div className="card-body text-end">
                        <div className="display-6 d-flex justify-content-between">
                            <i className="fal fa-file-invoice-dollar"></i>
                            {orderCount}
                        </div>
                        ĐƠN HÀNG
                    </div>
                </div>
            </div>
        </>
    );
}

