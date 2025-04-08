import { useState } from 'react';
import {ToastContainer} from "react-toastify";
import {Navigate, Outlet} from "react-router-dom";
import Navbar from "../../../components/Header/components/Navbar.jsx"
import 'react-toastify/dist/ReactToastify.css';

export default function layoutAdmin () {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // const check = checkAdmin();
    const check = true;
    return !check ? (
            <Navigate to="/admin/login" replace/>
        ) : (
        <>
            <ToastContainer />
            <div className="">
                <div className="flex h-screen overflow-hidden">

                    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

                        <main>
                            <div className="mx-auto max-w-screen-3xl p-4 md:p-6 2xl:p-10">
                                <Outlet/>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
};
