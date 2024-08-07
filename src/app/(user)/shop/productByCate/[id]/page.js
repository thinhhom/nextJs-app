"use client"

import ShopCard from "../../../component/shopCard/ShopCard";
import Categories from "../../../categories/page";
import Link from "next/link";
import Loading from "../../../loading"
import useSWR from 'swr';


const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ProductByCategories({params}) {
    const idcate = params.id
    const { data: productByCategories, error: productError, isLoading: productIsLoading } = useSWR(`http://localhost:3000/productbycate/${idcate}`, fetcher);
    const { data: listCategory, error: categoryError, isLoading: categoryIsLoading } = useSWR('http://localhost:3000/categories', fetcher);

    if (productError || categoryError) return <div>Lỗi load dữ liệu</div>;
    if (productIsLoading || categoryIsLoading) return <div><Loading /></div>;

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
                                            <input type="email" placeholder="Tìm kiếm sản phẩm..."/>
                                            <button><i className="fa fa-search"></i></button>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="product-short">
                                            <div className="dropdown">
                                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Product short by</a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a href="#" className="dropdown-item">Newest</a>
                                                    <a href="#" className="dropdown-item">Popular</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ShopCard data={productByCategories}/>
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
                                <li><Link href="/shop">Tất cả sản phẩm</Link><span>(83)</span></li>
                            </ul>
                            <Categories data={listCategory}/>
                        </div>
                        <div className="sidebar-widget image">
                            <h2 className="title">Featured Product</h2>
                            <a href="#">
                                <img src="../../img/category-1.jpg" alt="Image"/>
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