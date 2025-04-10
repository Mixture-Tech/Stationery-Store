  import Cookies from "js-cookie";
import axiosClient from './axiosClient';
import { jwtDecode } from 'jwt-decode';

const getUserIdFromToken = () => {
    const token = Cookies.get('token');
    if (!token) return null;
    try {
        const decoded = jwtDecode(token);
        return decoded.id_user;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

export const createOrder = async (orderData) => {
    console.log(orderData);
    try {
        const id_user = getUserIdFromToken();
        if (!id_user) {
            throw new Error('User not authenticated');
        }

        console.log( {
            ...orderData,
            id_user
        });
        const response = await axiosClient.post('/orders/create', {
            ...orderData,
            id_user
        }, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

  export const getUserOrders = async () => {
      const id_user = getUserIdFromToken();
      const token = Cookies.get("token");

      if (!id_user) throw new Error("User not authenticated");
      if (!token) throw new Error("Token missing");

      try {
          const response = await axiosClient.get(`/orders/user/${id_user}`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });

          console.log("📦 response:", response);
          return response;

      } catch (error) {
          console.error("Lỗi khi gọi API:", error.response?.data || error.message);
          throw error;
      }
  };

  // ✅ Lấy chi tiết đơn hàng theo ID
  export const getOrderDetail = async (orderId) => {
      const response = await axiosClient.get(`/orders/${orderId}`, {
          headers: {
              Authorization: `Bearer ${Cookies.get('token')}`
          }
      });

      return response;
  };