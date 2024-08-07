"use client";
import { useEffect, useState } from "react";

export default function CustomerCount() {
    const [customerCount, setCustomerCount] = useState(0);
    const fetchCustomerCount = async () => {
        const res = await fetch('http://localhost:3000/customerCount', { cache: 'no-store' });
        const data = await res.json();
        setCustomerCount(data);
    }

    useEffect(() => {
        fetchCustomerCount();
    }, []);

    return (
        <>
            <div className="col-md-3 mb-4">
                <div className="card border-0 rounded-0 bg-danger-subtle text-danger">
                    <div className="card-body text-end">
                        <div className="display-6 d-flex justify-content-between">
                            <i className="fal fa-users"></i>
                            {customerCount}
                        </div>
                        KHÁCH HÀNG
                    </div>
                </div>
            </div>
        </>
    );
}

