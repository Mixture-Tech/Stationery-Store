import {Suspense/*, useState*/} from 'react'
/*import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'*/
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import loadable from "@loadable/component";
import AuthLayout from "./layouts/AuthLayout";
import BasicLayout from "./layouts/BasicLayout";
import BlankLayout from "./layouts/LayoutNotSearch";

/*const Login = loadable(() => import("./pages/Auth/Login"));
const Home = loadable(() => import("./pages/Home"));
const Regiter = loadable(() => import("./pages/Auth/Register"));*/
const Product = loadable(() => import("./pages/ListProduct"));
const ProductDetail = loadable(() => import("./pages/ProductDetail/index.jsx"));
const AboutUs = loadable(() => import("./pages/AboutUs/index.jsx"));
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    {/* <Route path="/logout" element={<Logout />} /> */}
                </Route>
                <Route element={<BasicLayout />}>
                    {/*<Route
                        index
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <Home title="Trang Chủ" />
                            </Suspense>
                        }
                    />*/}
                    <Route
                        path="/danh-sach-san-pham"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <Product title="Danh sách sản phẩm" />
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
                        path="/ve-chung-toi"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <AboutUs title="Về chúng tôi" />
                            </Suspense>
                        }
                    />
                </Route>
                <Route element={<BlankLayout />}>
                    {/*<Route
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
                    />*/}
                </Route>   
            </Routes>
        </BrowserRouter>
    );
}
