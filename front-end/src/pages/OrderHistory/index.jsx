import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../../services/apis/orderApi.js';

const statusColors = {
    "Đã giao": "bg-green-100 text-green-700",
    "Đang vận chuyển": "bg-purple-100 text-purple-700",
    "Chờ xác nhận": "bg-yellow-100 text-yellow-700",
};

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getUserOrders();
                console.log("Dữ liệu đơn hàng từ API:", data);
                if (!Array.isArray(data)) {
                    throw new Error("Dữ liệu đơn hàng không hợp lệ.");
                }

                const mappedOrders = data.map(order => ({
                    id: order.id_order,
                    status: order.status,
                    date: new Date(order.create_at).toLocaleDateString('vi-VN'),
                    amount: order.total_price,
                    productName: order.orderDetails?.[0]?.product?.name || "Không rõ",
                    image: order.orderDetails?.[0]?.product?.image || null
                }));
                setOrders(mappedOrders);
            } catch (err) {
                console.error("Lỗi khi lấy danh sách đơn hàng:", err);
                setError("Không thể tải danh sách đơn hàng.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div className="p-8">Đang tải dữ liệu...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;

    return (
        <div className="p-8">
            <h1 className="text-xl font-bold mb-4">Lịch sử đơn hàng</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 bg-white shadow-sm rounded-lg">
                    <thead className="bg-gray-100 text-gray-700 text-sm">
                    <tr>
                        <th className="p-3 text-left">Mã hóa đơn</th>
                        <th className="p-3 text-left">Tên sản phẩm</th>
                        <th className="p-3 text-left">Ngày</th>
                        <th className="p-3 text-left">Tổng số tiền</th>
                        <th className="p-3 text-left">Tình trạng</th>
                        <th className="p-3 text-left"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order, idx) => (
                        <tr key={idx} className="border-t border-gray-200 hover:bg-gray-50">
                            <td className="p-3 font-medium">{order.id}</td>
                            <td className="p-3 flex items-center gap-3">
                                <img
                                    src={order.image || "https://via.placeholder.com/50x50?text=Image"}
                                    alt={order.productName}
                                    className="w-12 h-12 object-cover rounded"
                                />
                                <div>
                                    <p className="font-semibold">{order.productName}</p>
                                </div>
                            </td>
                            <td className="p-3">{order.date}</td>
                            <td className="p-3 font-medium">
                                {order.amount?.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                            </td>
                            <td className="p-3">
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="p-3">
                                <Link to={`/chi-tiet-hoa-don/${order.id}`}>
                                    <button className="bg-indigo-500 text-white text-sm px-4 py-1 rounded hover:bg-indigo-600">
                                        Chi tiết
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderHistory;
