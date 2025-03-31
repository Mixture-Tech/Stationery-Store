import axiosClient from './axiosClient';

export const categoryApi = {
    // Lấy tất cả category
    getAll: () => {
        return axiosClient.get(`/categories`);
    },

    // Lấy category theo ID
    getById: (id) => {
        return axiosClient.get(`/categories/${id}`);
    },

    // Lấy category theo parent ID
    getByParentId: (parentId) => {
        return axiosClient.get(`/categories/parent/${parentId}`);
    },

    // Tạo category mới
    create: (data) => {
        return axiosClient.post(`/categories`, data);
    },

    // Cập nhật category
    update: (id, data) => {
        return axiosClient.put(`/categories/${id}`, data);
    },

    // Xóa category
    delete: (id) => {
        return axiosClient.delete(`/categories/${id}`);
    }
}; 