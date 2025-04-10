import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import SlideProduct from './components/SlideProduct'
import SuggestProduct from './components/SuggestProduct';
import { categoryParentApi } from '../../services/apis/CategoryParentApi';
import { categoryApi } from '../../services/apis/categoryApi';
import { productApi } from '../../services/apis/ProductApi';

const Home = () => {
    const [categoryData, setCategoryData] = useState([]);
    const [suggestProducts, setSuggestProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy danh sách category parent
                const parentResponse = await categoryParentApi.getAll();
                const parentData = parentResponse;

                // Lấy ngẫu nhiên 3 category parent
                const randomParents = parentData
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 3);

                // Lấy dữ liệu cho mỗi category parent
                const processedData = await Promise.all(
                    randomParents.map(async (parent) => {
                        // Lấy danh sách category con
                        const categoriesResponse = await categoryApi.getByParentId(parent.id_parent);
                        const categories = categoriesResponse;

                        // Lấy ngẫu nhiên 3 category
                        const randomCategories = categories
                            .sort(() => Math.random() - 0.5)
                            .slice(0, 3);

                        // Lấy sản phẩm cho mỗi category
                        const categoryProducts = await Promise.all(
                            randomCategories.map(async (category) => {
                                const productsResponse = await productApi.getProductsByCategory(category.id_category);
                                const products = productsResponse
                                    .sort(() => Math.random() - 0.5)
                                    .slice(0, 10)
                                    .map(product => ({
                                        id: product.id_product,
                                        src: product.image || "https://placehold.co/1200x1000",
                                        name: product.name,
                                        price: `${product.price} đ`,
                                        nums: product.nums || 0,
                                        discountPrice: product.discount_price,
                                        discount: `${product.discount || 0}`,
                                        rating: Math.floor(Math.random() * 5) + 1,
                                        categoryName: product.category.name_category,
                                    }));
                                return {
                                    name: category.name_category,
                                    products
                                };
                            })
                        );

                        return {
                            name: parent.name_parent,
                            categories: categoryProducts
                        };
                    })
                );

                setCategoryData(processedData);
                const allCategory = await categoryApi.getAll();
                // Lấy tất cả sản phẩm cho SuggestProduct
                const allProductsResponse = await productApi.getAllProducts();
                const allProducts = allProductsResponse
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 20)
                    .map(product => ({
                        id: product.id_product,
                        src: product.image || "https://placehold.co/1200x1000",
                        name: product.name,
                        price: `${product.price} đ`,
                        nums: product.nums || 0,
                        discountPrice: product.discount_price,
                        discount: `${product.discount || 0}`,
                        rating: Math.floor(Math.random() * 5) + 1,
                        categoryName: Array.isArray(allCategory)
                            ? allCategory
                                .filter(category => category.id_category === product.id_category)
                                .map(category => category.name_category)
                                .join(", ")
                            : "Chưa có danh mục"
                    }));

                setSuggestProducts(allProducts);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };

        fetchData();
    }, []);

    const handleAddToCartSuccess = () => {
        toast.success('Đã thêm sản phẩm vào giỏ hàng thành công!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleAddToCartError = (errorMessage) => {
        toast.error(errorMessage, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <main>
            <ToastContainer />
            <div className="flex gap-10 flex-col items-center justify-center w-full p-6">
                {categoryData.map((parent, index) => (
                    <SlideProduct 
                        key={index} 
                        title={parent.name} 
                        categories={parent.categories}
                        onAddToCartSuccess={handleAddToCartSuccess}
                        onAddToCartError={handleAddToCartError}
                    />
                ))}
            </div>
            <div className='flex gap-2 items-center justify-center mt-10'>
                <SuggestProduct 
                    products={suggestProducts}
                    onAddToCartSuccess={handleAddToCartSuccess}
                    onAddToCartError={handleAddToCartError}
                />
            </div>
        </main>
    );
}

export default Home;