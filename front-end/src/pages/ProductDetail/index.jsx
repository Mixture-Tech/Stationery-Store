import { useState } from "react";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { addToCart } from "../../services/apis/cartApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
    const location = useLocation();
    const product = location.state;
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = async () => {
        try {
            await addToCart(product.productId, quantity);
            toast.success('Đã thêm sản phẩm vào giỏ hàng thành công!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            toast.error(error.message || 'Có lỗi xảy ra khi thêm vào giỏ hàng', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleBuyNow = () => {
        toast.info('Tính năng đang được phát triển!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const formatStringToNumber = (str) => {
        // Loại bỏ tất cả các ký tự không phải số, dấu chấm và dấu trừ
        const cleanStr = str.replace(/[^\d.-]/g, '');
        // Lấy giá trị tuyệt đối của số
        return Math.abs(parseFloat(cleanStr));
    };

    const calculateOriginalPrice = (discountedPrice, discountPercent) => {
        // Chuyển đổi string sang number
        const price = typeof discountedPrice === 'string' 
            ? formatStringToNumber(discountedPrice) 
            : discountedPrice;
        
        const discount = formatStringToNumber(discountPercent);
        console.log(price, discount);
        if (typeof price !== 'number' || typeof discount !== 'number') {
            return null;
        }
        if (discount <= 0 || discount >= 100) {
            return null;
        }
        // Tính giá gốc từ giá đã giảm và phần trăm giảm giá
        const originalPrice = price / (1 - discount/100);
        return Math.round(originalPrice).toFixed(3); // Làm tròn để tránh số thập phân
    };

    if (!product) {
        return <div className="text-center py-8">Không tìm thấy sản phẩm</div>;
    }
    console.log(product);
    return (
        <div className="max-w-full p-4 mt-14">
            <ToastContainer />
            <div className="flex flex-col md:flex-row gap-6">
                {/* Ảnh sản phẩm */}
                <div className="w-full md:w-2/5 rounded-lg shadow-md p-4">
                    <img
                        src={product.productImage}
                        alt={product.productName}
                        className="w-full"
                    />
                    <div className="flex flex-col items-center">
                        {/* Chọn số lượng */}
                        <div className="flex items-center mt-4">
                            <h2 className="font-bold text-lg mr-2">Số lượng:</h2>
                            <div className="rounded-md border border-grey-200">
                                <button
                                    className="bg-gray-200 px-2 rounded"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    -
                                </button>
                                <span className="mx-2">{quantity}</span>
                                <button
                                    className="bg-gray-200 px-2 rounded"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex gap-4">
                        <Button
                            variant="outlined"
                            color="error"
                            className="w-1/2"
                            onClick={handleAddToCart}
                        >
                            Thêm vào giỏ hàng
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            className="w-1/2"
                            onClick={handleBuyNow}
                        >
                            Mua ngay
                        </Button>
                    </div>
                    <div className="mt-4 text-left">
                        <h2 className="font-bold text-md mb-3">Chính sách ưu đãi của Mixture</h2>
                        <h3 className="text-sm mb-2 before:content-['•'] before:mr-2"><strong>Thời gian giao hàng:</strong> Giao nhanh và uy tín</h3>
                        <h3 className="text-sm mb-2 before:content-['•'] before:mr-2"><strong>Chính sách đổi trả:</strong> Đổi trả miễn phí toàn quốc</h3>
                        <h3 className="text-sm mb-4 before:content-['•'] before:mr-2"><strong>Chính sách khách sỉ:</strong> Ưu đãi khi mua số lượng lớn</h3>
                    </div>
                </div>

                {/* Thông tin sản phẩm */}
                <div className="w-full md:w-3/5 text-left mt-6">
                    <div className="rounded-lg shadow-md p-4">
                        <h2 className="font-bold text-2xl mb-2">
                            {product.productName}
                        </h2>

                        {/* Giá sản phẩm */}
                        <div className="mt-2">
                            <span className="text-red-700 text-3xl font-bold">
                                {calculateOriginalPrice(product.productOldPrice, product.productDiscount)}
                            </span>
                            {product.productDiscount && (
                                <>
                                    <span className="text-gray-400 line-through ml-2">
                                        {product.productOldPrice}
                                    </span>
                                    <span className="font-bold bg-red-700 text-white px-2 py-1 rounded-md text-sm ml-2">
                                        {product.productDiscount}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Thông tin chi tiết */}
                    <div className="rounded-lg shadow-md p-4 mt-4">
                        <h2 className="font-bold text-lg mb-2">Thông tin chi tiết</h2>
                        <table className="w-full border-collapse text-md">
                            <tbody>
                            <tr>
                                <td className="py-2 font-semibold text-gray-600">Mã sản phẩm</td>
                                <td className="py-2">{product.productId}</td>
                            </tr>
                            <tr>
                                <td className="py-2 font-semibold text-gray-600">Danh mục</td>
                                <td className="py-2">{product.categoryName || 'N/A'}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
