import axiosClient from "./axiosClient";
import {setToken} from "../auth/auth";

export const register = (registerRequest) => {
    const url = "/auth/register";
    return axiosClient.post(url, registerRequest);
};

export const authenticate = async (authenticateRequest) => {
    try {
        const url = "/auth/login";
        const response = await axiosClient.post(url, authenticateRequest);
        if (response) {
            const { token, user } = response;
            if (token && user) {
                // Lưu token vào cookie
                document.cookie = `token=${token}; path=/; max-age=86400`; // 1 ngày
                // Lưu thông tin user vào localStorage
                localStorage.setItem('user', JSON.stringify(user));
                return response;
            } else {
                throw new Error("Dữ liệu không hợp lệ");
            }
        } else {
            throw new Error("Không nhận được dữ liệu từ server");
        }
    } catch (error) {
        console.error("Authenticate: ", error);
        throw error;
    }
};

export const getCurrentUser = async (request) => {
    try {
        const url = "/auth/get-current-user";
        const response = await axiosClient.get(url, request);
        return response;
    } catch (error) {
        console.error("Get current user: ", error);
        throw error;
    }
};

export const forgotPassword = (forgotPasswordRequest) => {
    const url = "auth/forgot-password";
    return axiosClient.post(url, forgotPasswordRequest);
};

export const changePassword = (changePasswordRequest) => {
    const url = "auth/change-password";
    return axiosClient.post(url, changePasswordRequest);
}

export const verifyOTP = (data) => {
    console.log("Data gửi đi:", data);
    const url = "/auth/verify-otp";
    return axiosClient.post(url, {
        email: data.email,
        otp: data.otp
    });
};

// Thêm hàm lấy Google Auth URL
export const getGoogleAuthUrl = async () => {
    const url = "/auth/google";
    const response = await axiosClient.get(url);
    return response.url; // Trả về URL từ server
};

export const googleCallback = async (code) => {
    try {
        const url = `/api/v1/auth/google/callback?code=${code}`;
        const response = await axiosClient.get(url);
        
        console.log("Google callback response:", response);
        
        const { token, user } = response; // Đảm bảo response có token và user
        if (token && user) {
            document.cookie = `token=${token}; path=/; max-age=86400`; 
            localStorage.setItem("user", JSON.stringify(user));
            return { token, user }; // Trả về dữ liệu để client xử lý
        } else {
            throw new Error("Đăng nhập Google thất bại: Không nhận được token hoặc thông tin user");
        }
    } catch (error) {
        console.error("Google callback error:", error);
        throw error;
    }
};
