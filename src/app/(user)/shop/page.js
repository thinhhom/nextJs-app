"use client"

import Link from "next/link";
import Categories from "../categories/page";
import ShopCard from "../component/shopCard/ShopCard";
import { useEffect, useState } from "react";
import Loading from "../loading"
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        async function fetchProducts() {
            const listProducts = await fetch(`http://localhost:3000/products`, { cache: 'no-store' })
            .then(res => res.json());
            setProducts(listProducts);
        }
        fetchProducts();
    }, [])

    const { data: listCategory, error, isLoading } = useSWR('http://localhost:3000/categories', fetcher);
    if (error) return <div>Lỗi load dữ liệu</div>;
    if (isLoading) return <div><Loading /></div>;

    
    const handleSort = (products) => {
        let sortedProducts = [...products];

        if (sortOption === 'new') {
            sortedProducts = sortedProducts.filter(product => product.new === 1);
        } else if (sortOption === 'hot') {
            sortedProducts = sortedProducts.filter(product => product.hot === 1);
        } else if (sortOption === 'priceRange1') {
            sortedProducts = sortedProducts.filter(product => product.price >= 0 && product.price <= 100000);
        } else if (sortOption === 'priceRange2') {
            sortedProducts = sortedProducts.filter(product => product.price > 100000 && product.price <= 300000);
        } else if (sortOption === 'priceRange3') {
            sortedProducts = sortedProducts.filter(product => product.price >= 300000 && product.price <= 500000);
        } else if (sortOption === 'priceRange4') {
            sortedProducts = sortedProducts.filter(product => product.price >= 500000 && product.price <= 1000000);
        } else {
            sortedProducts.sort((a, b) => {
                if (sortOption === 'asc') {
                    return a.price - b.price;
                } else if (sortOption === 'desc') {
                    return b.price - a.price;
                }
            });
        }

        return sortedProducts;
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    return (
        <>
            <div className="breadcrumb-wrap">
                <div className="container">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Products</a></li>
                        <li className="breadcrumb-item active">product list</li>
                    </ul>
                </div>
            </div>

            <div className="product-view">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="product-search">
                                                <form className="d-flex ms-4" action="/search">
                                                    <input type="text" name="keyword" placeholder="Tìm kiếm sản phẩm..." />
                                                    <button type="submit"><i className="fa fa-search"></i></button>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="product-short">
                                                <div className="dropdown">
                                                    <select id="sort-select" className="custom-select" onChange={handleSortChange}>
                                                    <option disabled selected value="">Lọc sản phẩm phù hợp</option>
                                                        <option value="asc">Giá tăng dần</option>
                                                        <option value="desc">Giá giảm dần</option>
                                                        <option value="new">Sản phẩm mới</option>
                                                        <option value="hot">Sản phẩm nổi bật</option>
                                                        <option value="priceRange1">Khoảng từ 0 VNĐ - 100.000 VNĐ</option>
                                                        <option value="priceRange2">Khoảng từ 100.000 VNĐ - 300.000 VNĐ</option>
                                                        <option value="priceRange3">Khoảng từ 300.000 VNĐ - 500.000 VNĐ</option>
                                                        <option value="priceRange4">Khoảng từ 500.000 VNĐ - 1.000.000 VNĐ</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ShopCard data={handleSort(products)} />
                            </div>

                            <div className="col-lg-12">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item disabled">
                                            <a className="page-link" href="#" tabIndex="-1">Previous</a>
                                        </li>
                                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>



                        <div className="col-md-3">
                            <div className="sidebar-widget category">
                                <h2 className="title">Category</h2>
                                <ul className="mt-3">
                                    <li><Link href="">Tất cả sản phẩm</Link><span>(83)</span></li>
                                </ul>
                                <Categories data={listCategory} />
                            </div>

                            <div className="sidebar-widget image">
                                <h2 className="title">Featured Product</h2>
                                <a href="#">
                                    <img src="img/category-1.jpg" alt="Image" />
                                </a>
                            </div>

                            <div className="sidebar-widget brands">
                                <h2 className="title">Our Brands</h2>
                                <ul>
                                    <li><a href="#">Nulla </a><span>(45)</span></li>
                                    <li><a href="#">Curabitur </a><span>(34)</span></li>
                                    <li><a href="#">Nunc </a><span>(67)</span></li>
                                    <li><a href="#">Ullamcorper</a><span>(74)</span></li>
                                    <li><a href="#">Fusce </a><span>(89)</span></li>
                                    <li><a href="#">Sagittis</a><span>(28)</span></li>
                                </ul>
                            </div>

                            <div className="sidebar-widget tag">
                                <h2 className="title">Tags Cloud</h2>
                                <a href="#">Lorem ipsum</a>
                                <a href="#">Vivamus</a>
                                <a href="#">Phasellus</a>
                                <a href="#">pulvinar</a>
                                <a href="#">Curabitur</a>
                                <a href="#">Fusce</a>
                                <a href="#">Sem quis</a>
                                <a href="#">Mollis metus</a>
                                <a href="#">Sit amet</a>
                                <a href="#">Vel posuere</a>
                                <a href="#">orci luctus</a>
                                <a href="#">Nam lorem</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

