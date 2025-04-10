import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { StorageKeys } from "../../services/key/keys";

const ProtectedRoute = () => {
    const isAuthenticated = !!Cookies.get(StorageKeys.ACCESS_TOKEN);
    
    return isAuthenticated ? <Outlet /> : <Navigate to="/401" replace />;
};

export default ProtectedRoute; 