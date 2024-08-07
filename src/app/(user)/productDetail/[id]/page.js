"use client"

import useSWR from 'swr';
import Loading from "../../loading"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '@/redux/slices/cartslice';


const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ProductDetail({ params }) {
    const id = params.id;
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('S');
    const dispatch = useDispatch();
    
    const { data: product, error, isLoading } = useSWR(`http://localhost:3000/products/${id}`, fetcher);
    if(error) return <div>Lỗi load dữ liệu</div>;
    if(isLoading) return <div><Loading/></div>;


    return (
        <>
        <div className="breadcrumb-wrap">
            <div className="container">
                <ul className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Products</a></li>
                    <li className="breadcrumb-item active">product details</li>
                </ul>
            </div>
        </div>


        <div className="product-detail">
            <div className="container">
                <div className="row">
                    <div className="col-lg-9">
                        <div className="row align-items-center product-detail-top">
                            <div className="col-md-5">
                                <div className="product-slider-single">
                                    <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${product.image}`} alt={product.name} width={270} height={300} />
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="product-content">
                                    <div className="title"><h2>{product.name}</h2></div>
                                    <div className="ratting">
                                        {[...Array(Math.floor(product.rating))].map((_, index) => (
                                            <i key={index} className="fa fa-star"></i>
                                        ))}
                                        {product.rating % 1 !== 0 && <i className="fa fa-star-half-o"></i>}
                                        {[...Array(5 - Math.ceil(product.rating))].map((_, index) => (
                                            <i key={index + Math.ceil(product.rating)} className="fa fa-star-o"></i>
                                        ))}
                                    </div>
                                    <div className="price">{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND'})}<span></span></div>
                                    <div className="details">
                                        <p style={{ whiteSpace: 'pre-line' }}>{product.shortDescribe}</p>
                                    </div>

                                    <div class="size">
                                        <h4>Size:</h4>
                                        <div class="size-selector">
                                            <input type="radio" name="size" id="size-s" value="S" onChange={(e) => setSize(e.target.value)}/>
                                            <label for="size-s">S</label>

                                            <input type="radio" name="size" id="size-m" value="M" onChange={(e) => setSize(e.target.value)}/>
                                            <label for="size-m">M</label>

                                            <input type="radio" name="size" id="size-l" value="L" onChange={(e) => setSize(e.target.value)}/>
                                            <label for="size-l">L</label>

                                            <input type="radio" name="size" id="size-xl" value="XL" onChange={(e) => setSize(e.target.value)}/>
                                            <label for="size-xl">XL</label>
                                        </div>
                                    </div>

                                    <div className="quantity">
                                        <h4>Quantity:</h4>
                                        <input className="form-control w-25 border-3" min="1" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                    </div>
                                    <div className="action d-flex">
                                        <a href="#" onClick={() => dispatch(addItem({product, quantity, size}))}><i className="fa fa-cart-plus"></i></a>
                                        <a href="#"><i className="fa fa-heart"></i></a>
                                        <a href="#"><i className="fa fa-search"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row product-detail-bottom">
                            <div className="col-lg-12">
                                <ul className="nav nav-pills nav-justified">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="pill" href="#description">Description</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="pill" href="#specification">Specification</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="pill" href="#reviews">Reviews (1)</a>
                                    </li>
                                </ul>

                                <div className="tab-content">
                                    <div id="description" className="container tab-pane active"><br/>
                                        <h4>Product description</h4>
                                        <p style={{ whiteSpace: 'pre-line' }}>{product.description}</p>
                                    </div>
                                    <div id="specification" className="container tab-pane fade"><br/>
                                        <h4>Product specification</h4>
                                        <ul>
                                            <li>Lorem ipsum dolor sit amet</li>
                                            <li>Lorem ipsum dolor sit amet</li>
                                            <li>Lorem ipsum dolor sit amet</li>
                                            <li>Lorem ipsum dolor sit amet</li>
                                            <li>Lorem ipsum dolor sit amet</li>
                                        </ul>
                                    </div>
                                    <div id="reviews" className="container tab-pane fade"><br/>
                                        <div className="reviews-submitted">
                                            <div className="reviewer">Phasellus Gravida - <span>01 Jan 2020</span></div>
                                            <div className="ratting">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                            <p>
                                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                                            </p>
                                        </div>
                                        <div className="reviews-submit">
                                            <h4>Give your Review:</h4>
                                            <div className="ratting">
                                                <i className="fa fa-star-o"></i>
                                                <i className="fa fa-star-o"></i>
                                                <i className="fa fa-star-o"></i>
                                                <i className="fa fa-star-o"></i>
                                                <i className="fa fa-star-o"></i>
                                            </div>
                                            <div className="row form">
                                                <div className="col-sm-6">
                                                    <input type="text" placeholder="Name"/>
                                                </div>
                                                <div className="col-sm-6">
                                                    <input type="email" placeholder="Email"/>
                                                </div>
                                                <div className="col-sm-12">
                                                    <textarea placeholder="Review"></textarea>
                                                </div>
                                                <div className="col-sm-12">
                                                    <button>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="section-header">
                                <h3>Related Products</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra at massa sit amet ultricies. Nullam consequat, mauris non interdum cursus
                                </p>
                            </div>
                        </div>

                        <div className="row align-items-center product-slider product-slider-3">
                            {/* <div className="col-lg-3">
                                <div class="product-item">
                                    <div class="product-image">
                                        <a href="product-detail.html">
                                            <img src="/img/product-1.png" alt="Product Image"/>
                                        </a>
                                        <div class="product-action">
                                            <a href="#"><i class="fa fa-cart-plus"></i></a>
                                            <a href="#"><i class="fa fa-heart"></i></a>
                                            <a href="#"><i class="fa fa-search"></i></a>
                                        </div>
                                    </div>
                                    <div class="product-content">
                                        <div class="title"><a href="#">Phasellus Gravida</a></div>
                                        <div class="ratting">
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                        </div>
                                        <div class="price">$22 <span>$25</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div class="product-item">
                                    <div class="product-image">
                                        <a href="product-detail.html">
                                            <img src="/img/product-2.png" alt="Product Image"/>
                                        </a>
                                        <div class="product-action">
                                            <a href="#"><i class="fa fa-cart-plus"></i></a>
                                            <a href="#"><i class="fa fa-heart"></i></a>
                                            <a href="#"><i class="fa fa-search"></i></a>
                                        </div>
                                    </div>
                                    <div class="product-content">
                                        <div class="title"><a href="#">Phasellus Gravida</a></div>
                                        <div class="ratting">
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                        </div>
                                        <div class="price">$22 <span>$25</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div class="product-item">
                                    <div class="product-image">
                                        <a href="product-detail.html">
                                            <img src="/img/product-3.png" alt="Product Image"/>
                                        </a>
                                        <div class="product-action">
                                            <a href="#"><i class="fa fa-cart-plus"></i></a>
                                            <a href="#"><i class="fa fa-heart"></i></a>
                                            <a href="#"><i class="fa fa-search"></i></a>
                                        </div>
                                    </div>
                                    <div class="product-content">
                                        <div class="title"><a href="#">Phasellus Gravida</a></div>
                                        <div class="ratting">
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                        </div>
                                        <div class="price">$22 <span>$25</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div class="product-item">
                                    <div class="product-image">
                                        <a href="product-detail.html">
                                            <img src="/img/product-4.png" alt="Product Image"/>
                                        </a>
                                        <div class="product-action">
                                            <a href="#"><i class="fa fa-cart-plus"></i></a>
                                            <a href="#"><i class="fa fa-heart"></i></a>
                                            <a href="#"><i class="fa fa-search"></i></a>
                                        </div>
                                    </div>
                                    <div class="product-content">
                                        <div class="title"><a href="#">Phasellus Gravida</a></div>
                                        <div class="ratting">
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                        </div>
                                        <div class="price">$22 <span>$25</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div class="product-item">
                                    <div class="product-image">
                                        <a href="product-detail.html">
                                            <img src="/img/product-5.png" alt="Product Image"/>
                                        </a>
                                        <div class="product-action">
                                            <a href="#"><i class="fa fa-cart-plus"></i></a>
                                            <a href="#"><i class="fa fa-heart"></i></a>
                                            <a href="#"><i class="fa fa-search"></i></a>
                                        </div>
                                    </div>
                                    <div class="product-content">
                                        <div class="title"><a href="#">Phasellus Gravida</a></div>
                                        <div class="ratting">
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                        </div>
                                        <div class="price">$22 <span>$25</span></div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <div className="sidebar-widget category">
                            <h2 className="title">Category</h2>
                            <ul>
                                <li><a href="#">Lorem Ipsum</a><span>(83)</span></li>
                                <li><a href="#">Cras sagittis</a><span>(198)</span></li>
                                <li><a href="#">Vivamus</a><span>(95)</span></li>
                                <li><a href="#">Fusce vitae</a><span>(48)</span></li>
                                <li><a href="#">Vestibulum</a><span>(210)</span></li>
                                <li><a href="#">Proin phar</a><span>(78)</span></li>
                            </ul>
                        </div>
                        
                        <div className="sidebar-widget image">
                            <h2 className="title">Featured Product</h2>
                            <a href="#">
                                <img src="/img/category-1.jpg" alt="Image"/>
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
}