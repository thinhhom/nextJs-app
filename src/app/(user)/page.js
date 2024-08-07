
import Image from "next/image";
import Link from "next/link";
import SliderComponent from "./component/slider/slider.jsx";
import ProductCard from "./component/productCard/ProductCard.jsx";

export default async function Home() {
  const hotProducts = await fetch('http://localhost:3000/products/topRating', { cache: 'no-store' })
  .then((res) => res.json())
  const newProducts = await fetch('http://localhost:3000/products/new', { cache: 'no-store' })
  .then((res) => res.json())
  return (
    <>
      <SliderComponent/>

      <div className="feature">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-6 feature-col">
              <div className="feature-content">
                <i className="fa fa-shield"></i>
                <h2>Trusted Shopping</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 feature-col">
              <div className="feature-content">
                <i className="fa fa-shopping-bag"></i>
                <h2>Quality Product</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 feature-col">
              <div className="feature-content">
                <i className="fa fa-truck"></i>
                <h2>Worldwide Delivery</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 feature-col">
              <div className="feature-content">
                <i className="fa fa-phone"></i>
                <h2>Telephone Support</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>




      <div className="category">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <div className="category-img">
                <img src="img/category-1.jpg" />
                <Link className="category-name" href="">
                  <h2>Category Name</h2>
                </Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="category-img">
                <img src="img/category-3.jpg" />
                <Link className="category-name" href="">
                  <h2>Category Name</h2>
                </Link>
              </div>
              <div className="category-img">
                <img src="img/category-4.jpg" />
                <Link className="category-name" href="">
                  <h2>Category Name</h2>
                </Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="category-img">
                <img src="img/category-2.jpg" />
                <Link className="category-name" href="">
                  <h2>Category Name</h2>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="featured-product">
        <div className="container">
          <div className="section-header">
            <h3>SẢN PHẨM NỔI BẬT</h3>
            <p>
            Không chỉ là thời trang, E Shop còn là “phòng thí nghiệm” của tuổi trẻ - nơi nghiên cứu và cho ra đời nguồn năng lượng mang tên “Youth”. Chúng mình luôn muốn tạo nên những trải nghiệm vui vẻ, năng động và trẻ trung.
            </p>
          </div>
          <div className="row align-items-center product-slider product-slider-4">
              <ProductCard data={hotProducts}/>
            {/* <div className="col-lg-3">
              <div className="product-item">
                <div className="product-image">
                  <Link href="product-detail.html">
                    <img src="img/product-2.png" alt="Product Image" />
                  </Link>
                  <div className="product-action">
                    <Link href="#"><i className="fa fa-cart-plus"></i></Link>
                    <Link href="#"><i className="fa fa-heart"></i></Link>
                    <Link href="#"><i className="fa fa-search"></i></Link>
                  </div>
                </div>
                <div className="product-content">
                  <div className="title"><Link href="#">Phasellus Gravida</Link></div>
                  <div className="ratting">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                  <div className="price">$22 <span>$25</span></div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>




      <div className="newsletter">
        <div className="container">
          <div className="section-header">
            <h3>Subscribe Our Newsletter</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra at massa sit amet ultricies. Nullam consequat, mauris non interdum cursus
            </p>
          </div>
          <div className="form">
            <input type="email"/>
            <button>Submit</button>
          </div>
        </div>
      </div>




      <div className="recent-product">
        <div className="container">
          <div className="section-header">
            <h3>SẢN PHẨM MỚI</h3>
            <p>
            Không chỉ là thời trang, E Shop còn là “phòng thí nghiệm” của tuổi trẻ - nơi nghiên cứu và cho ra đời nguồn năng lượng mang tên “Youth”. Chúng mình luôn muốn tạo nên những trải nghiệm vui vẻ, năng động và trẻ trung.
            </p>
          </div>
          <div className="row align-items-center product-slider product-slider-4">
            <ProductCard data={newProducts}/>
            {/* <div className="col-lg-3">
              <div className="product-item">
                <div className="product-image">
                  <Link href="product-detail.html">
                    <img src="img/product-2.png" alt="Product Image" />
                  </Link>
                  <div className="product-action">
                    <Link href="#"><i className="fa fa-cart-plus"></i></Link>
                    <Link href="#"><i className="fa fa-heart"></i></Link>
                    <Link href="#"><i className="fa fa-search"></i></Link>
                  </div>
                </div>
                <div className="product-content">
                  <div className="title"><Link href="#">Phasellus Gravida</Link></div>
                  <div className="ratting">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                  <div className="price">$22 <span>$25</span></div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>




      <div className="brand">
        <div className="container">
          <div className="section-header">
            <h3>Our Brands</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra at massa sit amet ultricies. Nullam consequat, mauris non interdum cursus
            </p>
          </div>
          <div className="brand-slider">
            <div className="brand-item"><img src="img/brand-1.png" alt="" /></div>
            <div className="brand-item"><img src="img/brand-2.png" alt="" /></div>
            <div className="brand-item"><img src="img/brand-3.png" alt="" /></div>
            <div className="brand-item"><img src="img/brand-4.png" alt="" /></div>
            <div className="brand-item"><img src="img/brand-5.png" alt="" /></div>
            <div className="brand-item"><img src="img/brand-6.png" alt="" /></div>
          </div>
        </div>
      </div>
    </>
  );
}
