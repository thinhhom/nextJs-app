import React from 'react';
import ProductCard from '../component/productCard/ProductCard';

export default async function search(params) {
    // console.log(params);
    const keyword = params.searchParams.keyword;
    if (keyword == "") {
        return (
            <div className="container d-flex justify-content-center align-items-center" style={{ height: '30vh' }}>
                <div className="row">
                    <div className="col-12 text-center">
                        <h3>Vui lòng nhập từ khóa tìm kiếm!</h3>
                    </div>
                </div>
            </div>
        );
    }
    const productSearch = await fetch('http://localhost:3000/search/' + keyword)
    .then(res => res.json());
    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12">
                        <h3>Kết quả tìm kiếm cho từ khóa: "{params.searchParams.keyword}"</h3>
                        <div className="row">
                            <ProductCard data={productSearch} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}