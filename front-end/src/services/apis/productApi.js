import axiosClient from './axiosClient';

export const productApi = {
    // Lấy danh sách tất cả sản phẩm
    getAllProducts: () => {
        return axiosClient.get('/products');
    },

    // Lấy thông tin sản phẩm theo ID
    getProductById: (id) => {
        return axiosClient.get(`/products/id/${id}`);
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

    // Lấy sản phẩm theo danh mục
    getProductsByCategory: (categoryId) => {
        return axiosClient.get(`/products/category/${categoryId}`);
    },

    // Lấy sản phẩm theo subject
    getProductsByName: (subject) => {
        return axiosClient.get(`/products/name/${subject}`);
    },

    searchProducts: (name) => {
        const url = `/products/name/${encodeURIComponent(name)}`;
        return axiosClient.get(url);
    }
};