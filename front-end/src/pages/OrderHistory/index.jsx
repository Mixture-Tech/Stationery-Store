import { Link } from 'react-router-dom';

const orders = [
    {
        id: "TBT15454841",
        productName: "World's Most Expensive T Shirt",
        category: "Women's Clothes",
        image: "https://bizweb.dktcdn.net/100/415/697/products/2-0ec0e3e5-a2ed-4eff-ab0c-f717cac6a6a0.jpg?v=1701401878383",
        date: "01 Jul, 2022",
        amount: 287.53,
        status: "Đã giao",
    },
    {
        id: "TBT15425012",
        productName: "Onyx SmartGRID Chair Red",
        category: "Furniture & Decor",
        image: "https://file.hstatic.net/200000394765/file/ghe_cong_thai_hoc_upgen_revolution_pro__7__5a744a0d7e7145b0945000f7f08d3e81.jpg",
        date: "01 Feb, 2023",
        amount: 39.99,
        status: "Đang vận chuyển",
    },
    {
        id: "TBT1524563",
        productName: "Slippers Open Toe",
        category: "Footwear",
        image: "https://via.placeholder.com/50x50?text=Slippers",
        date: "09 Dec, 2022",
        amount: 874.0,
        status: "Đang vận chuyển",
    },
    {
        id: "TBT1524530",
        productName: "Hp Trendsetter Backpack",
        category: "Handbags & Clutches",
        image: "https://via.placeholder.com/50x50?text=Backpack",
        date: "02 Jan, 2023",
        amount: 32.0,
        status: "Đã giao",
    },
    {
        id: "TBT13642870",
        productName: "Innovative education book",
        category: "Books",
        image: "https://via.placeholder.com/50x50?text=Book",
        date: "08 Jan, 2023",
        amount: 18.32,
        status: "Chờ xác nhận",
    },
];

const statusColors = {
    "Đã giao": "bg-green-100 text-green-700",
    "Đang vận chuyển": "bg-purple-100 text-purple-700",
    "Chờ xác nhận": "bg-yellow-100 text-yellow-700",
};

const OrderHistoryTable = () => {
    return (
        <div className="p-8">
            <h1 className="text-xl font-bold mb-4">Order History</h1>
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
                        <tr
                            key={idx}
                            className="border-t border-gray-200 hover:bg-gray-50"
                        >
                            <td className="p-3 font-medium">{order.id}</td>
                            <td className="p-3 flex items-center gap-3">
                                <img
                                    src={order.image}
                                    alt={order.productName}
                                    className="w-12 h-12 object-cover rounded"
                                />
                                <div>
                                    <p className="font-semibold">{order.productName}</p>
                                    <p className="text-sm text-gray-500">{order.category}</p>
                                </div>
                            </td>
                            <td className="p-3">{order.date}</td>
                            <td className="p-3 font-medium">${order.amount.toFixed(2)}</td>
                            <td className="p-3">
                  <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status]}`}
                  >
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

export default OrderHistoryTable;
