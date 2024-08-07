import Header from "./component/header/header.jsx";
import Footer from "./component/footer/footer.jsx";
import Providers from "../../redux/Provider";

export const metadata = {
  title: "Cửa hàng thời trang",
  description: "Mua quần áo thời trang nam đẹp, trẻ trung, đồ trang phục công sở chất lượng, thiết kế mới, thoải mái từ thương hiệu UNIQLO với nhiều kiểu dáng cùng chất lượng ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content="Bootstrap Ecommerce Template" name="keywords" />
        <meta content="Bootstrap Ecommerce Template Free Download" name="description" />
        <link href="/img/favicon.ico" rel="icon" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap" rel="stylesheet" />
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
        <link href="/lib/slick/slick.css" rel="stylesheet" />
        <link href="/lib/slick/slick-theme.css" rel="stylesheet" />
        <link href="/css/style.css" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning={true}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"></script>
        <script src="/lib/easing/easing.min.js"></script>
        <script src="/lib/slick/slick.min.js"></script>
        {/* <script src="/js/main.js"></script> */}
      </body>
    </html>
  );
}
