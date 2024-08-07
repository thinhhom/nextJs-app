import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function ProductCard(props) {
    return (
        <>
            {props.data.map((product) => {
                const { _id, name, image, price, priceSale, rating } = product;
                return (
                    <div className="col-lg-3" key={_id}>
                        <div className="product-item">
                            <div className="product-image">
                                <Link href={`/productDetail/${_id}`}>
                                    <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${image}`} alt={name} width={270} height={270} />
                                </Link>
                                <div className="product-action">
                                    <Link href={`/productDetail/${_id}`}><i className="fa fa-cart-plus"></i></Link>
                                    <Link href="#"><i className="fa fa-heart"></i></Link>
                                    <Link href="#"><i className="fa fa-search"></i></Link>
                                </div>
                            </div>
                            <div className="product-content">
                                <div className="title"><Link href="#">{name}</Link></div>
                                {/* <div className="ratting">
                                    {[...Array(Math.floor(rating))].map((_, index) => (
                                        <i key={index} className="fa fa-star"></i>
                                    ))}
                                    {rating % 1 !== 0 && <i className="fa fa-star-half-o"></i>}
                                    {[...Array(5 - Math.ceil(rating))].map((_, index) => (
                                        <i key={index + Math.ceil(rating)} className="fa fa-star-o"></i>
                                    ))}
                                </div> */}
                                <div className="price">{priceSale.toLocaleString('vi-VN', { style: 'currency', currency: 'VND'})} <span>{price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND'})}</span></div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}