import axiosClient from './axiosClient';

export const userApi = {
    // Lấy danh sách tất cả users
    getAllUsers: () => {
        return axiosClient.get('/users');
    },

    // Lấy thông tin user theo ID
    getUserById: (id) => {
        return axiosClient.get(`/users/${id}`);
    },

    // Tạo user mới
    createUser: (userData) => {
        return axiosClient.post('/users', userData);
    },

    // Cập nhật thông tin user
    updateUser: (id, userData) => {
        return axiosClient.put(`/users/${id}`, userData);
    },

    // Xóa user
    deleteUser: (id) => {
        return axiosClient.delete(`/users/${id}`);
    },

    // Đăng nhập
    login: (username, password) => {
        return axiosClient.post('/auth/login', { username, password });
    },

    // Đăng ký
    register: (userData) => {
        return axiosClient.post('/auth/register', userData);
    }
}; 