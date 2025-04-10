const OrderDetail = () => {
    const order = {
        id: "TBT15454841",
        productName: "World's Most Expensive T Shirt",
        category: "Women's Clothes",
        image: "https://bizweb.dktcdn.net/100/415/697/products/2-0ec0e3e5-a2ed-4eff-ab0c-f717cac6a6a0.jpg?v=1701401878383",
        date: "01 Jul, 2022",
        amount: 287.53,
        status: "Đã giao",
        quantity: 1,
        shippingAddress: "123 Nguyễn Văn Cừ, Q.5, TP.HCM",
        paymentMethod: "Thẻ tín dụng",
    };

    const statusColors = {
        "Đã giao": "bg-green-100 text-green-700",
        "Đang vận chuyển": "bg-purple-100 text-purple-700",
        "Chờ xác nhận": "bg-yellow-100 text-yellow-700",
    };

    return (
        <div className="p-20 max-w-3xl mx-auto bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-6 flex justify-center">Chi tiết đơn hàng</h1>
            <div className="flex items-center gap-6">
                <img
                    src={order.image}
                    alt={order.productName}
                    className="w-32 h-32 object-cover rounded"
                />
                <div>
                    <h2 className="text-xl font-semibold">{order.productName}</h2>
                    <p className="text-gray-500">{order.category}</p>
                    <span className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${statusColors[order.status]}`}>
                        {order.status}
                    </span>
                </div>
            </div>

            <div className="mt-6 space-y-3 text-sm">
                <p><strong>Mã đơn hàng:</strong> {order.id}</p>
                <p><strong>Ngày đặt:</strong> {order.date}</p>
                <p><strong>Số lượng:</strong> {order.quantity}</p>
                <p><strong>Tổng tiền:</strong> ${order.amount.toFixed(2)}</p>
                <p><strong>Phương thức thanh toán:</strong> {order.paymentMethod}</p>
                <p><strong>Địa chỉ giao hàng:</strong> {order.shippingAddress}</p>
            </div>

            <div className="mt-8 flex justify-center">
                <a
                    href="/"
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                >
                    Quay lại đơn hàng
                </a>
            </div>
        </div>
    );
};

export default OrderDetail;
