import { useState, useEffect } from "react";
import SearchBox from "../../Components/SearchBox";
import CategoryCard from "../../Components/CardCategory";
import { ITEMS_PER_PAGE } from "../../../../util/constants";
import { categoryApi } from "../../../../services/apis/categoryApi";
import Pagination from "../../Components/Pagination";
import { ToastContainer } from 'react-toastify';
import CardCategory from "../../Components/CardCategory";

export default function CategoryList ({ onEditCategory }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryApi.getAll();
                const formartedResponse = response.map(category => ({
                    ...category,
                    hide: Number(category.hide),
                }));
                setCategories(formartedResponse);
                setTotalPages(Math.ceil(response.length / ITEMS_PER_PAGE));
            } catch (error) {
                console.error('Lỗi khi lấy danh sách categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryDelete = () => {
        setCategories(categories);
    }

    // Phân trang dữ liệu sản phẩm
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return categories.slice(startIndex, endIndex);
    };

    // Xử lý thay đổi trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="flex flex-col w-full">
            <SearchBox width="15%" />
            {/* Hàng tiêu đề (Header) */}
            <div className="grid grid-cols-4 gap-4 bg-gray-200 rounded-md place-items-center">
                {[
                    { label: "ID" },
                    { label: "Tên" },
                    { label: "Ẩn/Hiện" },
                    { label: "Action" },
                ].map((item, index) => (
                    <div key={index} className="px-2 py-3 font-nunito font-bold text-gray-600 text-center">
                        {item.label}
                    </div>
                ))}
            </div>
            
            {loading ? (
                <div className="text-center py-4">Đang tải...</div>
            ) : categories.length === 0 ? (
                <div className="text-center py-4 font-nunito font-bold text-gray-500">Chưa có dữ liệu danh mục</div>
            ) : (
                <>
                    <CategoryCard 
                        categories={getCurrentPageData()} 
                        onCategoryDelete={handleCategoryDelete}
                        onEditCategory={onEditCategory} // Truyền hàm xử lý sự kiện sửa danh mục

                    />

                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        totalItems={categories.length}
                    />
                </>
            )}
            <ToastContainer />
        </div>
    );
};