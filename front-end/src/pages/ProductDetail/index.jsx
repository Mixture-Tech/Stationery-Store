import { useState } from "react";
import { Button, Snackbar, Alert } from "@mui/material";
import { useLocation } from "react-router-dom";
import { addToCart } from "../../services/apis/cartApi";

const ProductDetail = () => {
    const location = useLocation();
    const product = location.state;
    const [quantity, setQuantity] = useState(1);
    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "success" // success, error, warning, info
    });

    const handleAddToCart = async () => {
        try {
            await addToCart(product.productId, quantity);
            setNotification({
                open: true,
                message: "Đã thêm sản phẩm vào giỏ hàng thành công!",
                severity: "success"
            });
        } catch (error) {
            setNotification({
                open: true,
                message: error.message || "Có lỗi xảy ra khi thêm vào giỏ hàng",
                severity: "error"
            });
        }
    };

    const handleBuyNow = () => {
        setNotification({
            open: true,
            message: "Tính năng đang được phát triển!",
            severity: "info"
        });
    };

    const handleCloseNotification = () => {
        setNotification(prev => ({ ...prev, open: false }));
    };

    if (!product) {
        return <div className="text-center py-8">Không tìm thấy sản phẩm</div>;
    }

    console.log(product);

    return (
        <div className="max-w-full p-4 mt-14">
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
                                {product.productPrice}
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
                                <td className="py-2 font-semibold text-gray-600">Tên sản phẩm</td>
                                <td className="py-2">{product.productName}</td>
                            </tr>
                            <tr>
                                <td className="py-2 font-semibold text-gray-600">Giá gốc</td>
                                <td className="py-2">{product.productOldPrice}</td>
                            </tr>
                            <tr>
                                <td className="py-2 font-semibold text-gray-600">Khuyến mãi</td>
                                <td className="py-2">{product.productDiscount}</td>
                            </tr>
                            <tr>
                                <td className="py-2 font-semibold text-gray-600">Giá khuyến mãi</td>
                                <td className="py-2">{product.productPrice}</td>
                            </tr>
                            <tr>
                                <td className="py-2 font-semibold text-gray-600">Danh mục</td>
                                <td className="py-2">{product.categoryName || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td className="py-2 font-semibold text-gray-600">Thông tin mô tả</td>
                                <td className="py-2">{product.product_description|| 'N/A'}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Sản phẩm liên quan */}
                    <div className="rounded-lg shadow-md p-4 mt-6">
                        <h2 className="font-bold text-lg mb-4">Sản phẩm liên quan</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="border rounded-md p-4 shadow hover:shadow-lg transition duration-300">
                                    <img
                                        src={product.productImage}
                                        alt="Sản phẩm liên quan"
                                        className="w-full h-40 object-cover mb-2 rounded"
                                    />
                                    <h3 className="font-semibold text-md mb-1">{product.productName} #{item}</h3>
                                    <span className="text-red-700 text-xxl font-bold">
                                        {product.productPrice}
                                    </span>
                                    {product.productDiscount && (
                                        <>
                                            <span className="text-gray-400 line-through ml-2">
                                                {product.productOldPrice}
                                            </span>
                                        </>
                                    )}
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        className="mt-2"
                                    >
                                        Xem chi tiết
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Component thông báo */}
            <Snackbar
                open={notification.open}
                autoHideDuration={3000}
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleCloseNotification}
                    severity={notification.severity}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ProductDetail;
