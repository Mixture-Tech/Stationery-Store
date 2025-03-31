import axiosClient from './axiosClient';

export const productApi = {
    // Lấy danh sách tất cả sản phẩm
    getAllProducts: () => {
        return axiosClient.get('api/v1/products');
    },

    // Lấy thông tin sản phẩm theo ID
    getProductById: (id) => {
        return axiosClient.get(`/products/${id}`);
    },

    // Tạo sản phẩm mới
    createProduct: (productData) => {
        return axiosClient.post('/products', productData);
    },

    // Cập nhật thông tin sản phẩm
    updateProduct: (id, productData) => {
        return axiosClient.put(`/products/${id}`, productData);
    },

    // Xóa sản phẩm
    deleteProduct: (id) => {
        return axiosClient.delete(`/products/${id}`);
    },

    // Tìm kiếm sản phẩm theo tên
    searchProducts: (name) => {
        return axiosClient.get(`/products/search?name=${name}`);
    },

    // Lấy sản phẩm theo danh mục
    getProductsByCategory: (categoryId) => {
        return axiosClient.get(`/products/category/${categoryId}`);
    }
};