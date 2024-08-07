"use client";
import { useEffect, useState } from "react";

export default function ProductCount() {
    const [productCount, setProductCount] = useState(0);
    const fetchProductCount = async () => {
        const res = await fetch('http://localhost:3000/productCount', { cache: 'no-store' });
        const data = await res.json();
        setProductCount(data);
    }

    useEffect(() => {
        fetchProductCount();
    }, []);

    return (
        <>
            <div className="col-md-3 mb-4">
                <div className="card border-0 rounded-0 bg-warning-subtle text-warning">
                    <div className="card-body text-end">
                        <div className="display-6 d-flex justify-content-between">
                            <i className="fal fa-boxes"></i>
                            {productCount}
                        </div>
                        SẢN PHẨM
                    </div>
                </div>
            </div>
        </>
    );
}