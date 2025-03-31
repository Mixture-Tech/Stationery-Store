import axiosClient from './axiosClient';

// const BASE_URL = 'http://localhost:3000/api/v1';

export const categoryParentApi = {
    // Lấy tất cả category parent
    getAll: () => {
        return axiosClient.get(`/category-parent`);
    },

    // Lấy category parent theo ID
    getById: (id) => {
        return axiosClient.get(`/category-parent/${id}`);
    },

    // Lấy danh sách category con theo parent ID
    getCategoriesByParentId: (parentId) => {
        return axiosClient.get(`/category-parent/${parentId}/categories`);
    },

    // Tạo category parent mới
    create: (data) => {
        return axiosClient.post(`/category-parent`, data);
    },

    // Cập nhật category parent
    update: (id, data) => {
        return axiosClient.put(`/category-parent/${id}`, data);
    },

    // Xóa category parent
    delete: (id) => {
        return axiosClient.delete(`/category-parent/${id}`);
    }
}; 