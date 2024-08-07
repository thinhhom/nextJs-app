import "../../../public/css/bootstrap.min.css";
import "../../../public/css/style1.css";
import "../../../public/css/fontawesome.css"
import Leftbar from "./components/leftbar";
import Topbar from "./components/topbar";

export const metadata = {
  title: 'Admin E Shop',
  description: 'Trang quản lý bằng Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} style={{ background:"#eff8ff" }}>
        <div className="d-flex min-vh-100">
          <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-primary" style={{ maxWidth: 280 + "px" }} data-bs-theme="dark">
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none justify-content-center">
              <img src="/img/logo.svg" />
              <span className="fs-4 d-none d-sm-inline-block">E SHOP</span>
            </a>
            <hr />
            <Leftbar></Leftbar>
          </div>
          <div className="w-100">
            <Topbar></Topbar>
              {children}
          </div>
        </div>
        <script src="/js/google.chart.js"></script>
        {/* <script src="/js/chart.js"></script> */}
        <script src="/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  )
}
