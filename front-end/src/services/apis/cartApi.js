import Cookies from "js-cookie";
import axiosClient from './axiosClient';
// Lấy giỏ hàng của người dùng
export const getCart = async () => {
    try {
        const token = Cookies.get("token");
        if (!token) {
            throw new Error("Chưa đăng nhập");
        }
        const response = await axiosClient.get("/cart/get-cart-by-user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('response cart: ', response);
        return response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Thêm sản phẩm vào giỏ hàng
export const addToCart = async (productId, quantity) => {
    try {
        const token = Cookies.get("token");
        if (!token) {
            throw new Error("Chưa đăng nhập");
        }

        const response = await axiosClient.post(
            `/cart/add-to-cart`,
            { productId, quantity },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
export const updateCartItem = async (productId, quantity) => {
    try {
        const token = Cookies.get("token");
        if (!token) {
            throw new Error("Chưa đăng nhập");
        }

        const response = await axiosClient.put(
            `/cart/update-cart-item`,
            { productId, quantity },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = async (productId) => {
    try {
        const token = Cookies.get("token");
        if (!token) {
            throw new Error("Chưa đăng nhập");
        }

        const response = await axiosClient.delete(`/cart/remove-from-cart/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}; 