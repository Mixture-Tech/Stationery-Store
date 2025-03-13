import { useState } from "react";
import { Button } from "@mui/material";

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        alert("Đã thêm vào giỏ hàng!");
    };

    const handleBuyNow = () => {
        alert("Mua ngay!");
    };

    return (
        <div className="max-w-full p-4 mt-6">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Ảnh sản phẩm */}
                <div className="w-full md:w-2/5 rounded-lg shadow-md p-4">
                    <img
                        src="https://sonca.vn/wp-content/uploads/2019/11/acco-sat-sdi-ageless-1-e1628529960803.png"
                        alt="Take Note - Ngữ Pháp Tiếng Anh"
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
                        <h2 className="font-bold text-md mb-3">Chính sách ưu đãi của Fahasa</h2>
                        <h3 className="text-sm mb-2 before:content-['•'] before:mr-2"><strong>Thời gian giao hàng:</strong> Giao nhanh và uy tín</h3>
                        <h3 className="text-sm mb-2 before:content-['•'] before:mr-2"><strong>Chính sách đổi trả:</strong> Đổi trả miễn phí toàn quốc</h3>
                        <h3 className="text-sm mb-4 before:content-['•'] before:mr-2"><strong>Chính sách khách sỉ:</strong> Ưu đãi khi mua số lượng lớn</h3>
                    </div>
                </div>

                {/* Thông tin sản phẩm */}
                <div className="w-full md:w-3/5 text-left">
                    <div className="rounded-lg shadow-md p-4">
                        <h2 className="font-bold text-2xl mb-2">
                            Acco sắt SDI-Ageless (nẹp giấy sắt)
                        </h2>
                        {/*<div className="flex flex-wrap text-md">
                            <div className="w-1/2">
                                <h2 className="font-semibold text-gray-600 mb-2">Nhà cung cấp: SDI</h2>
                                <h2 className="font-semibold text-gray-600 ">Mã sản phẩm: SP000231</h2>
                            </div>
                            <div className="w-1/2">
                                <h2 className="font-semibold text-gray-600 mb-2">Danh mục: Bìa báo cáo, các loại bìa</h2>
                                <h2 className="font-semibold text-gray-600 ">Hình thức bìa: Bìa Mềm</h2>
                            </div>
                        </div>*/}
                        <div className="mt-2">
                            <h2 className="text-sm font-bold">Đã bán 119</h2>
                        </div>

                        {/* Giá sản phẩm */}
                        <div className="mt-2">
                            <span className="text-red-700 text-3xl font-bold">52.500 đ</span>
                            <span className="text-gray-400 line-through ml-2">75.000 đ</span>
                            <span className="font-bold bg-red-700 text-white px-2 py-1 rounded-md text-sm ml-2">
                                -30%
                            </span>
                        </div>
                        <h2 className="text-sm text-blue-600 font-semibold mt-2">Sản phẩm trong kho: 100</h2>
                    </div>

                    {/* Thông tin chi tiết */}
                    <div className="rounded-lg shadow-md p-4 mt-4">
                        <h2 className="font-bold text-lg mb-2">Thông tin chi tiết</h2>
                        <table className="w-full border-collapse text-md">
                            <tbody>
                            <tr>
                                <td className="py-2 font-semibold text-gray-600">Mã sản phẩm</td>
                                <td className="py-2">8936214272532</td>
                            </tr>
                            <tr>
                                <td className="py-2 font-semibold text-gray-600">Nhà cung cấp</td>
                                <td className="py-2 text-blue-600 cursor-pointer">SDI</td>
                            </tr>
                            <tr>
                                <td className="py-2 font-semibold text-gray-600">Danh mục</td>
                                <td className="py-2">Bìa báo cáo, các loại bìa</td>
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
