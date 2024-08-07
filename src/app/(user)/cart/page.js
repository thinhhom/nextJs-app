"use client"

import React, { useMemo } from "react"
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { removeCart, removeItem, updateItem } from "@/redux/slices/cartslice";

export default function CartPage() {
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch();
    const total = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart]);

    return (
        <>
            <div className="breadcrumb-wrap">
                <div className="container">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="#">Home</Link></li>
                        <li className="breadcrumb-item"><Link href="#">Products</Link></li>
                        <li className="breadcrumb-item active">Cart</li>
                    </ul>
                </div>
            </div>

            <div className="cart-page">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Size</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody className="align-middle">
                                        
                                        {cart.length > 0 && cart.map((product) => (
                                            <tr key={product._id}>
                                            <td><Link href="#"><img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${product.image}`} alt={product.name} /></Link></td>
                                            <td>{product.name}</td>
                                            <td>{product.size}</td>
                                            <td>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND'})}</td>
                                            <td>
                                                <div className="qty quantity">
                                                    <input className="mt-4 border-1" defaultValue={product.quantity} min="1" type="number" onChange={(e) => dispatch(updateItem({product, size: product.size, quantity: parseInt(e.target.value) }))}/>
                                                </div>
                                            </td>
                                            <td>{(product.price * product.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND'})}</td>
                                            <td><button onClick={() => dispatch(removeItem({product, size: product.size}))}><i className="fa fa-trash"></i></button></td>
                                        </tr>
                                        ))}
                                        {cart.length === 0 && (
                                            <tr>
                                                <td colSpan="7" style={{ textAlign: 'center' }}>Chưa có sản phẩm trong giỏ hàng !</td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                                <div className="remove-cart mb-2">
                                        <button onClick={() => dispatch(removeCart())}>Xóa tất cả</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="coupon">
                                <input type="text" placeholder="Coupon Code" />
                                <button>Apply Code</button>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="cart-summary">
                                <div className="cart-content">
                                    <h3>Cart Summary</h3>
                                    <p>Sub Total<span>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND'})}</span></p>
                                    <p>Shipping Cost<span>0 ₫</span></p>
                                    <h4>Grand Total<span>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND'})}</span></h4>
                                </div>
                                <div className="cart-btn">
                                    <button><Link href="/checkout">Thanh toán</Link></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
