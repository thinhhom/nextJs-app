"use client"

import ChartComponent from "./components/chart";
import CustomerCount from "./components/customerCount";
import OrderCount from "./components/orderCount";
import ProductCount from "./components/productCount";
import RecentOrder from "./components/recentOrder";
import TotalRevenue from "./components/totalRevenue";

export default function Admin() {
    return (
        <>
            <div className="container-fluid p-4">
                <div className="d-flex justify-content-between">
                    <h3 className="mb-4">Dashboard</h3>
                </div>
                <div className="row">
                    <OrderCount></OrderCount>
                    <ProductCount></ProductCount>
                    <CustomerCount></CustomerCount>
                    <TotalRevenue></TotalRevenue>
                </div>
                <div className="row">
                    <RecentOrder></RecentOrder>
                    <div className="col-md-4 mb-3">
                        <div className="card rounded-0 border-0 shadow-sm">
                            <div className="card-body">
                                <div className="d-flex border-bottom pb-2 justify-content-between">
                                    <h6 className="mb-0">
                                        <i className="fal fa-stars fa-lg me-2"></i>
                                        Recent Ratings
                                    </h6>
                                    <small>
                                        <a href="#" className="text-decoration-none">All Ratings</a>
                                    </small>
                                </div>
                                <div className="d-flex text-body-secondary pt-3">
                                    <i className="far fa-comment-alt-smile"></i>
                                    <a href="#" className="py-2 mb-0 small lh-sm border-bottom w-100 text-decoration-none text-body-secondary">
                                        <strong className="d-flex justify-content-between">
                                            iPhone 15 Pro Max 256GB Gold Rose
                                            <div className="text-warning">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                        </strong>
                                        Sản phẩm xịn, giá tốt!
                                    </a>
                                </div>
                                <div className="d-flex text-body-secondary pt-3">
                                    <i className="far fa-comment-alt-smile"></i>
                                    <a href="#" className="py-2 mb-0 small lh-sm border-bottom w-100 text-decoration-none text-body-secondary">
                                        <strong className="d-flex justify-content-between">
                                            Samsung Galaxy S23 Ultra
                                            <div className="text-warning">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                        </strong>
                                        Giá mắc, chất lượng tầm trung!
                                    </a>
                                </div>
                                <div className="d-flex text-body-secondary pt-3">
                                    <i className="far fa-comment-alt-smile"></i>
                                    <a href="#" className="py-2 mb-0 small lh-sm border-bottom w-100 text-decoration-none text-body-secondary">
                                        <strong className="d-flex justify-content-between">
                                            Samsung Galaxy S23 Ultra
                                            <div className="text-warning">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                        </strong>
                                        Giá mắc, chất lượng tầm trung!
                                    </a>
                                </div>
                                <div className="d-flex text-body-secondary pt-3">
                                    <i className="far fa-comment-alt-smile"></i>
                                    <a href="#" className="py-2 mb-0 small lh-sm border-bottom w-100 text-decoration-none text-body-secondary">
                                        <strong className="d-flex justify-content-between">
                                            Samsung Galaxy S23 Ultra
                                            <div className="text-warning">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                        </strong>
                                        Giá mắc, chất lượng tầm trung!
                                    </a>
                                </div>
                                <div className="d-flex text-body-secondary pt-3">
                                    <i className="far fa-comment-alt-smile"></i>
                                    <a href="#" className="py-2 mb-0 small lh-sm border-bottom w-100 text-decoration-none text-body-secondary">
                                        <strong className="d-flex justify-content-between">
                                            Samsung Galaxy S23 Ultra
                                            <div className="text-warning">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                        </strong>
                                        Giá mắc, chất lượng tầm trung!
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="card rounded-0 border-0 shadow-sm">
                            <div className="card-body">
                                <div className="d-flex border-bottom pb-2 justify-content-between">
                                    <h6 className="mb-0">
                                        <i className="fal fa-chart-pie fa-lg me-2"></i>
                                        Statistics</h6>
                                </div>
                                <ChartComponent></ChartComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}