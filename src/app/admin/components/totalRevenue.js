"use client";
import { useEffect, useState } from "react";

export default function TotalRevenue() {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const fetchTotalRevenue = async () => {
        const res = await fetch('http://localhost:3000/totalRevenue', { cache: 'no-store' });
        const data = await res.json();
        setTotalRevenue(data.totalRevenue || 0);
    }

    useEffect(() => {
        fetchTotalRevenue();
    }, []);

    return (
        <>
            <div className="col-md-3 mb-4">
                <div className="card border-0 rounded-0 bg-success-subtle text-success">
                    <div className="card-body text-end">
                        <div className="display-6 d-flex justify-content-between">
                            <i className="fal fa-chart-line"></i>
                            {totalRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </div>
                        DOANH THU
                    </div>
                </div>
            </div>
        </>
    );
}

