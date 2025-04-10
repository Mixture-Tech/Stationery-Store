import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderDetail } from '../../services/apis/orderApi.js'; // API giả định bạn đã có

const statusColors = {
    "Đã giao": "bg-green-100 text-green-700",
    "Đang vận chuyển": "bg-purple-100 text-purple-700",
    "Chờ xác nhận": "bg-yellow-100 text-yellow-700",
};

const OrderDetail = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const data = await getOrderDetail(id);
                console.log(data);
                setOrder(data);
            } catch (err) {
                console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
                setError("Không thể tải chi tiết đơn hàng.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetail();
    }, [id]);

    if (loading) return <div className="p-8">Đang tải dữ liệu...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;
    if (!order) return null;

    return (
        <div className="p-20 max-w-3xl mx-auto bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-6 flex justify-center">Chi tiết đơn hàng</h1>
            <div className="flex items-center gap-6">
                <img
                    src={order?.orderDetails?.[0]?.product?.image || "https://via.placeholder.com/100"}
                    alt={order?.orderDetails?.[0]?.product?.name || "Không rõ"}
                    className="w-32 h-32 object-cover rounded"
                />
                <div>
                    <h2 className="text-xl font-semibold">
                        {order?.orderDetails?.[0]?.product?.name || "Không rõ"}
                    </h2>
                    <span className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${statusColors[order.status]}`}>
                        {order.status}
                    </span>
                </div>
            </div>

            <div className="mt-6 space-y-3 text-sm">
                <p><strong>Mã đơn hàng:</strong> {order.id_order}</p>
                <p><strong>Ngày đặt:</strong> {new Date(order.create_at).toLocaleString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                })}</p>
                <p><strong>Số lượng:</strong> {order?.orderDetails?.[0]?.quantity || 0}</p>
                <p><strong>Tổng tiền:</strong> {order.total_price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                <p><strong>Phương thức thanh toán:</strong> {order.paymentmethods || "Không rõ"}</p>
                <p><strong>Địa chỉ giao hàng:</strong> {order.district?.name}, {order.province?.name}</p>
            </div>

            <div className="mt-8 flex justify-center">
                <Link
                    to="/lich-su-don-hang"
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                >
                    Quay lại đơn hàng
                </Link>
            </div>
        </div>
    );
};

export default OrderDetail;
