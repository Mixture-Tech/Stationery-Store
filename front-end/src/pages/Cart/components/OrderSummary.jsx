import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const OrderSummary = ({ order, deliveryFee, discountCode, total, cart }) => {
    const navigate = useNavigate();

    const formatCurrency = (value) => {
        if (value === undefined || value === null) return "0 ₫";
        return value.toLocaleString("vi-VN") + " ₫";
    };

    const handleCheckout = () => {
        if (order > 0) {
            navigate("/thanh-toan", {
                state: {
                    orderDetails: {
                        cart: cart,
                        subtotal: order,
                        discountCode: discountCode || "0%",
                        deliveryFee: deliveryFee,
                        total: total,
                    },
                },
            });
        } else {
            alert("Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán");
        }
    };

    return (
        <div className="w-full p-6 bg-white border-2 rounded-lg shadow-md ">
            <h2 className="mb-4 text-xl font-semibold">Tóm tắt đơn hàng</h2>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span>Sản phẩm</span>
                    <span>{formatCurrency(order)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                    <span>Giảm giá</span>
                    <span>{discountCode ? "-10%" : "0%"}</span>
                </div>
                <div className="flex justify-between">
                    <span>Vận chuyển</span>
                    <span>{formatCurrency(deliveryFee)}</span>
                </div>
                <div className="flex justify-between pt-2 font-semibold border-t">
                    <span>Tổng</span>
                    <span>{formatCurrency(total)}</span>
                </div>
            </div>
            <button
                onClick={handleCheckout}
                className="w-full px-4 py-2 mt-4 font-semibold text-white transition duration-300 rounded bg-indigo-700 hover:bg-indigo-500"
            >
                Thanh Toán
            </button>
        </div>
    );
};

OrderSummary.propTypes = {
    order: PropTypes.number,
    deliveryFee: PropTypes.number,
    discountCode: PropTypes.string,
    total: PropTypes.number,
    cart: PropTypes.array,
};

export default OrderSummary;