import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems }) => {
    // Tạo mảng các trang cần hiển thị (tối đa 5 trang)
    const getPageNumbers = () => {
        const pageNumbers = [];
        
        if (totalPages <= 5) {
            // Nếu tổng số trang <= 5, hiển thị tất cả các trang
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Nếu ở gần đầu (trang 1, 2)
            if (currentPage <= 3) {
                for (let i = 1; i <= 5; i++) {
                    pageNumbers.push(i);
                }
            } 
            // Nếu ở gần cuối
            else if (currentPage >= totalPages - 2) {
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } 
            // Nếu ở giữa
            else {
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pageNumbers.push(i);
                }
            }
        }
        
        return pageNumbers;
    };

    return (
        <div className="flex flex-col items-center mt-4">
            <div className="flex justify-center gap-2">
                {/* Nút Trước - Chỉ hiển thị khi không phải trang đầu tiên */}
                {currentPage > 1 && (
                    <button 
                        onClick={() => onPageChange(currentPage - 1)}
                        className="px-3 py-1 rounded bg-gray-200 text-gray-700"
                    >
                        Trước
                    </button>
                )}
                
                {/* Các nút số trang */}
                {getPageNumbers().map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        {page}
                    </button>
                ))}
                
                {/* Nút Sau - Chỉ hiển thị khi không phải trang cuối cùng */}
                {currentPage < totalPages && (
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        className="px-3 py-1 rounded bg-gray-200 text-gray-700"
                    >
                        Sau
                    </button>
                )}
            </div>
            <div className="text-center mt-2 text-gray-600">
                Tổng số mục: {totalItems}
            </div>
        </div>
    );
};

export default Pagination;