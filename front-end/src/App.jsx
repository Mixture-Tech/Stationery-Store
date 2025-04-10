import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import loadable from "@loadable/component";
import AuthLayout from "./layouts/AuthLayout";
import BasicLayout from "./layouts/BasicLayout";
import BlankLayout from "./layouts/LayoutNotSearch";
import CartProvider from "./context/CartProvider";
import AdminLayout from "./pages/Admin/layouts/LayoutAdmin.jsx"
import ProtectedRoute from "./components/Route/ProtectedRoute";

const Login = loadable(() => import("./pages/Auth/Login"));
const Regiter = loadable(() => import("./pages/Auth/Register"));
const Home = loadable(() => import("./pages/Home"));
const MailTemplate = loadable(() => import("./pages/MailForm"));
const Cart = loadable(() => import('./pages/Cart'));
const Payment = loadable(() => import('./pages/Payment'));
const ListProduct = loadable(() => import("./pages/list_product"));
const AboutUs = loadable(() => import("./pages/AboutUs"));
const ProductDetail = loadable(() => import("./pages/ProductDetail/index.jsx"));
const VerifyEmail = loadable(() => import("./pages/Auth/VerifyEmail"));
const Profile = loadable(() => import("./pages/Profile"));
const NotFoundPage = loadable(() => import("./components/404"));
const UnauthorizedPage = loadable(() => import("./components/401"));
const Success = loadable(() => import("./pages/Payment/Success"));
const OrderHistory = loadable(() => import("./pages/OrderHistory/index.jsx"));
const OrderDetail = loadable(() => import("./pages/OrderDetail/index.jsx"));

const LoginAdmin = loadable(()=> import("./pages/Admin/Auth"));
const DashBoard = loadable(() => import("./pages/Admin/pages/DashBoard"));


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    {/* <Route path="/logout" element={<Logout />} /> */}
                </Route>
                <Route element={<BasicLayout />}>
                    <Route
                        index
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <Home title="Trang Chủ" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/danh-sach-san-pham"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <ListProduct title="Danh sách sản phẩm" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/danh-sach-san-pham/:subject"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <ListProduct title="Danh sách sản phẩm" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/bieu-mau-mail"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <MailTemplate title="Biểu mẫu mail" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/ve-chung-toi"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <AboutUs title="Về chúng tôi" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/chi-tiet-san-pham"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <ProductDetail title="Chi tiết sản phẩm" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/lich-su-giao-dich"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <OrderHistory title="Lịch sử giao dịch" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/chi-tiet-hoa-don"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <OrderDetail title="Chi tiết hóa đơn" />
                            </Suspense>
                        }
                    />
                    <Route element={<ProtectedRoute />}>
                        <Route
                            path="/thanh-toan"
                            element={
                                <Suspense fallback={<CircularProgress />}>
                                    <Payment title="Thanh toán" />
                                </Suspense>
                            }
                        />
                        <Route
                        path="/trang-ca-nhan"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <Profile title="Trang cá nhân" />
                            </Suspense>
                        }
                        />
                        <Route
                            path="/gio-hang"
                            element={
                                <Suspense fallback={<CircularProgress />}>
                                    <CartProvider>
                                        <Cart title="Giỏ hàng" />
                                    </CartProvider>
                                </Suspense>
                            }
                        />
                        <Route
                            path="/thanh-toan/thanh-cong"
                            element={
                                <Suspense fallback={<CircularProgress />}>
                                    <Success title="Thanh toán thành công" />
                                </Suspense>
                            }
                        />
                    </Route>
                </Route>
                <Route element={<BlankLayout />}>
                    <Route
                        path="/dang-nhap"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <Login title="Đăng Nhập" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/dang-ki"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <Regiter title="Đăng Kí" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/xac-nhan-email"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <VerifyEmail title="Xác Nhận Email" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/404"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <NotFoundPage title="404" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/401"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <UnauthorizedPage title="401" />
                            </Suspense>
                        }
                    />
                </Route>
                {/* ADMIN */}
                <Route element={<BlankLayout />}>
                    <Route
                        path="/admin/login"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <LoginAdmin title="Đăng Nhập Admin" />
                            </Suspense>
                        }
                    />
                </Route>
                <Route element={<AdminLayout />}>
                    <Route
                        path="/trang-chu-admin"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <DashBoard title="Trang Chu Admin" />
                            </Suspense>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}