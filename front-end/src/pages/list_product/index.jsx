import { useState } from "react";
export default function ProductList() {
    const [sortOption, setSortOption] = useState("Bán Chạy Tuần");
    const categories = [
        {
            name: "Sách tiếng Việt",
            subcategories: [
                "Thiếu Nhi",
                "Giáo Khoa - Tham Khảo",
                "Văn Học",
                "Tâm Lý - Kỹ Năng Sống",
                "Manga - Comic",
                "Sách Học Ngoại Ngữ",
                "Kinh Tế",
                "Lịch Sử - Địa Lý - Tôn Giáo",
            ],
        },
    ];
    const priceRanges = [
        { label: "0đ - 150,000đ", value: "0-150000" },
        { label: "150,000đ - 300,000đ", value: "150000-300000" },
        { label: "300,000đ - 500,000đ", value: "300000-500000" },
        { label: "500,000đ - 700,000đ", value: "500000-700000" },
        { label: "700,000đ - Trở Lên", value: "700000+" },
    ];
    const products = [
        {
            id: 1,
            title: "Attack On Titan - Tập 25 - Tặng Kèm Bìa Hai Mặt",
            price: "43.200 đ",
            oldPrice: "48.000 đ",
            discount: "-10%",
            image: "https://cdn1.fahasa.com/media/catalog/product/n/x/nxbtre_full_25082025_110849.jpg",
        },
        {
            id: 2,
            title: "Spy X Family - Tập 12 - Tặng Kèm Standee PVC",
            price: "22.500 đ",
            oldPrice: "25.000 đ",
            discount: "-10%",
            image: "https://cdn1.fahasa.com/media/catalog/product/s/p/spy-x-family_bia_standee_tap-12.jpg",
        },
        {
            id: 3,
            title: "Sakamoto Days - Tập 19 - Đóng Cửa",
            price: "40.500 đ",
            oldPrice: "45.000 đ",
            discount: "-10%",
            image: "https://cdn1.fahasa.com/media/catalog/product/n/x/nxbtre_full_18342025_023404.jpg",
        },
        {
            id: 4,
            title: "Hoa Học Trò - Số 1453",
            price: "19.000 đ",
            oldPrice: "20.000 đ",
            discount: "-5%",
            image: "https://cdn1.fahasa.com/media/catalog/product/z/6/z6383914185966_8ccb205e90bd07f8964fc0a237cc0b58.jpg",
        },
        {
            id: 5,
            title: "Lược Sử Nước Việt Bằng Tranh (Tái Bản 2024)",
            price: "119.000 đ",
            oldPrice: "140.000 đ",
            discount: "-15%",
            image: "https://cdn1.fahasa.com/media/catalog/product/8/9/8935244874389.jpg",
        },
        {
            id: 6,
            title: "Atomic Habits - Thay Đổi Tí Hon Hiệu Quả Bất Ngờ",
            price: "151.200 đ",
            oldPrice: "189.000 đ",
            discount: "-20%",
            image: "https://cdn1.fahasa.com/media/catalog/product/_/2/_2024_-thay_doi_ti_hon_hieu_qua_bat_ngo-tb8-02.jpg",
        },
    ];

    const [selectedPrices, setSelectedPrices] = useState([]);

    const handlePriceChange = (value) => {
        setSelectedPrices((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    return (
        <div className="flex max-w-6xl mx-auto p-4 mt-16">
            {/* Sidebar */}
            <div className="w-1/4 p-4 bg-gray-100 rounded-lg mr-5 text-left">
                <h2 className="font-bold text-md cursor-pointer hover:text-orange-500">NHÓM SẢN PHẨM</h2>
                <ul className="mt-2 pl-0">
                    <li className="text-gray-600 font-semibold cursor-pointer hover:text-orange-500">Tất Cả Nhóm Sản Phẩm</li>
                    {categories.map((category, index) => (
                        <li key={index} className="mt-2">
                            <span className="text-orange-500 font-semibold pl-2 cursor-pointer hover:text-orange-500">{category.name}</span>
                            <ul className="mt-1 pl-4">
                                {category.subcategories.map((sub, i) => (
                                    <li key={i} className="text-gray-700 pl-1 cursor-pointer mb-1 hover:text-orange-500">{sub}</li>
                                    ))}
                            </ul>
                        </li>
                    ))}
                </ul>

                {/* Bộ lọc giá */}
                <h2 className="font-bold text-md mt-6">GIÁ</h2>
                <ul className="mt-2 pl-2">
                    {priceRanges.map((range, index) => (
                        <li key={index} className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                id={range.value}
                                value={range.value}
                                checked={selectedPrices.includes(range.value)}
                                onChange={() => handlePriceChange(range.value)}
                                className="mr-2 cursor-pointer"
                            />
                            <label htmlFor={range.value} className="cursor-pointer text-gray-700">{range.label}</label>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Product List */}
            <div className="w-3/4">
                <div className="flex justify-between mb-4">
                    <label>
                        Sắp xếp theo:
                        <select className="ml-2 p-1 border rounded" value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}>
                            <option>Bán Chạy Tuần</option>
                            <option>Giá Thấp Đến Cao</option>
                            <option>Giá Cao Đến Thấp</option>
                        </select>
                    </label>
                    <span>6 sản phẩm</span>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {products.map((product, index) => (
                        <div key={index} className="border p-2 rounded-lg hover:border-blue-gray-900 group">
                            <img src={product.image} alt={product.title} className="w-full cursor-pointer transform transition-transform duration-300 group-hover:scale-105"/>
                            <h3 className="text-sm font-semibold mt-2 cursor-pointer">{product.title}</h3>
                            <p className="text-red-500 font-bold">{product.price}</p>
                            <p className="text-gray-500 line-through text-sm">{product.oldPrice}</p>
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              {product.discount}
            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
