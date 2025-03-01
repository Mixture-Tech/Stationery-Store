import Cookies from "js-cookie";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { StorageKeys } from "../services/key/keys";
import { Navigate, Outlet } from "react-router-dom";
import {useState} from "react";

export default function BasicLayout(){
    const [searchResult, setSearchResult] = useState([]);
    const handleSearchResult = (results) => {
        setSearchResult(results);
    }

    return Cookies.get(StorageKeys.ACCESS_TOKEN) && (location.pathname ==="/dang-nhap" || location.pathname === "/dang-ki") ? (
        <Navigate to="/" replace />
    ) : (
        <div className="flex flex-col min-h-screen">
            <Header onSearchResult={handleSearchResult}/>
            <Searching results={searchResult} />
            <Footer/>
        </div>
    );
}