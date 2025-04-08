import { useState, useEffect } from "react";
import SearchBox from "../../Components/SearchBox";
import ProductCard from "../../Components/CardProduct";
import Pagination from "../../Components/Pagination";
import { productApi } from "../../../../services/apis/productApi";
import { ITEMS_PER_PAGE } from "../../../../util/constants";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductList({ onEditProduct }) { // Nhận onEditProduct từ props
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productApi.getAllProducts();
            const formattedResponse = response.map(product => ({
                ...product,
                price: Number(product.price),
                discount: Number(product.discount),
                nums: Number(product.nums),
                hide: Number(product.hide),
            }));
            setProducts(formattedResponse);
            setTotalPages(Math.ceil(response.length / ITEMS_PER_PAGE));
        } catch (error) {
            console.error('Lỗi khi lấy danh sách products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleProductDelete = () => {
        setProducts(products);
    };

    const getCurrentPageData = (productsData = products, page = currentPage) => {
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return productsData.slice(startIndex, endIndex);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="flex flex-col w-full">
            <SearchBox width="15%" />
            <div className="grid grid-cols-[0.3fr_2fr_0.7fr_0.4fr_0.6fr_0.4fr_0.6fr_0.9fr] gap-2 bg-gray-200 rounded-md place-items-center">
                {[
                    { label: "ID" },
                    { label: "Tên" },
                    { label: "Hàng Tồn" },
                    { label: "Giá (đ)" },
                    { label: "Giảm giá (%)" },
                    { label: "Ẩn/Hiện" },
                    { label: "Hãng" },
                    { label: "Action" },
                ].map((item, index) => (
                    <div key={index} className="px-2 py-3 font-nunito font-bold text-gray-600 text-center">
                        {item.label}
                    </div>
                ))}
            </div>
            
            {loading ? (
                <div className="text-center py-4">Đang tải...</div>
            ) : products.length === 0 ? (
                <div className="text-center py-4 font-nunito font-bold text-gray-500">Chưa có dữ liệu sản phẩm</div>
            ) : (
                <>
                    <ProductCard 
                        products={getCurrentPageData()} 
                        onProductDelete={handleProductDelete}
                        onEditProduct={onEditProduct} // Truyền onEditProduct xuống CardProduct
                    />
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        totalItems={products.length}
                    />
                </>
            )}
            <ToastContainer />
        </div>
    );
}