import PropTypes from 'prop-types';
import EditButton from './EditButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { categoryApi } from '../../../services/apis/categoryApi';
import { Buffer } from 'buffer';

const CardProduct = ({ products, onProductDelete, onEditProduct }) => {
    const [categories, setCategories] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryApi.getAll();
                const categoryMap = {};
                response.forEach(category => {
                    categoryMap[category.id_category] = category.name_category;
                });
                setCategories(categoryMap);
            } catch (error) {
                console.error('Lỗi khi lấy danh mục sản phẩm:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const formatPrice = (price) => {
        const numericPrice = Number(price); // Ép kiểu về số
        return numericPrice.toLocaleString('vi-VN', {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3
        });
    };

    const getHideStatus = (hide) => {
        return hide ? 'Ẩn' : 'Hiện';
    };

    const getCategoryName = (id_category) => {
        return categories[id_category] || 'Chưa phân loại';
    };

    const handleDeleteSuccess = (deletedProductId) => {
        if (onProductDelete) {
            onProductDelete(deletedProductId);
        }
    };

    if (loading) {
        return <div className="text-center py-4">Đang tải dữ liệu...</div>;
    }

    return (
        <>
            {products.map((product) => (
                <div key={product.id_product || product.id}>
                    <div className="grid grid-cols-[0.3fr_2fr_0.7fr_0.4fr_0.6fr_0.5fr_0.6fr_0.9fr] mt-2 border rounded-md place-items-center">
                        <div className="w-full">
                            <div className="py-3 font-nunito text-gray-800 text-center">
                                {product.id_product}
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="py-3 text-[14px] font-nunito text-gray-800 text-center">
                                {product.name}
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="py-3 font-nunito text-gray-800 text-center">
                                {product.nums}
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="py-3 font-nunito text-gray-800 text-center">
                                {formatPrice(product.price)}
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="py-3 font-nunito text-gray-800 text-center">
                                {product.discount}
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="py-3 font-nunito text-gray-800 text-center">
                                {getHideStatus(product.hide)}
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="py-3 font-nunito text-gray-800 text-center">
                                {getCategoryName(product.id_category)}
                            </div>
                        </div>
                        <div className="w-full flex justify-center">
                            <EditButton 
                                productId={product.id_product || product.id} 
                                onDeleteSuccess={handleDeleteSuccess}
                                onEditProduct={onEditProduct} // Truyền prop onEditProduct
                            />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

CardProduct.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id_product: PropTypes.number,
            id: PropTypes.number,
            name: PropTypes.string.isRequired,
            nums: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            hide: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Buffer)]),
            id_category: PropTypes.number.isRequired,
        })
    ).isRequired,
    onProductDelete: PropTypes.func,
    onEditProduct: PropTypes.func, // Thêm propTypes cho onEditProduct
};

export default CardProduct;