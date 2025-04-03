import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { productApi } from '../../services/apis/ProductApi';
import { categoryApi } from '../../services/apis/categoryApi';

export default function ListProduct() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [allCategories, setAllCategories] = useState([]);
    const [sortOption, setSortOption] = useState('Bán Chạy Tuần');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const productsPerPage = 20;
    const location = useLocation();
    const navigate = useNavigate();
    const categoryName = location.state?.categoryName;
    const searchQuery = location.state?.searchQuery;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await categoryApi.getAll();
                setAllCategories(categories);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách category:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                let productsData;

                if (searchQuery) {
                    // Tìm kiếm sản phẩm theo tên
                    setCategory(null); // Reset category khi tìm kiếm
                    productsData = await productApi.searchProducts(searchQuery);
                } else if (categoryName) {
                    const categoryResponse = await categoryApi.getCategoryByName(categoryName);
                    if (categoryResponse) {
                        setCategory(categoryResponse);
                        productsData = await productApi.getProductsByCategory(categoryResponse.id_category);
                    } else {
                        productsData = [];
                    }
                } else {
                    setCategory(null); // Reset category khi xem tất cả sản phẩm
                    productsData = await productApi.getAllProducts();
                }
                console.log(productsData);
                const formattedProducts = productsData.map(product => ({
                    id: product.id_product,
                    title: product.name,
                    price: `${product.price.toLocaleString('vi-VN')} đ`,
                    oldPrice: product.discount > 0 ? 
                        `${(product.price / (1 - product.discount/100)).toLocaleString('vi-VN')} đ` : 
                        null,
                    discount: product.discount > 0 ? `-${product.discount}%` : null,
                    image: product.image,
                    categoryId: product.category?.id_category,
                    categoryName: product.category?.name_category
                }));
                console.log(formattedProducts);
                setProducts(formattedProducts);
                setTotalPages(Math.ceil(formattedProducts.length / productsPerPage));
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
                setProducts([]);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryName, searchQuery]);

    // Tính toán sản phẩm cho trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Xử lý sắp xếp sản phẩm
    useEffect(() => {
        const sortProducts = () => {
            const sortedProducts = [...products];
            switch (sortOption) {
                case 'Giá Thấp Đến Cao':
                    sortedProducts.sort((a, b) => 
                        parseFloat(a.price.replace(/[^\d]/g, '')) - parseFloat(b.price.replace(/[^\d]/g, '')));
                    break;
                case 'Giá Cao Đến Thấp':
                    sortedProducts.sort((a, b) => 
                        parseFloat(b.price.replace(/[^\d]/g, '')) - parseFloat(a.price.replace(/[^\d]/g, '')));
                    break;
                default:
                    break;
            }
            setProducts(sortedProducts);
        };

        sortProducts();
    }, [sortOption]);

    return (
        <div className="container mx-auto p-4 mt-20">
            <div className="flex gap-4">
                {/* Filters */}
                <div className="w-1/4 bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold mb-4">Bộ lọc tìm kiếm</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium mb-2">Theo Danh Mục</h3>
                            <div className="space-y-2">
                                {allCategories.map((cat) => (
                                    <label key={cat.id_category} className="flex items-center">
                                        <input 
                                            type="checkbox" 
                                            className="mr-2"
                                            checked={category?.id_category === cat.id_category}
                                            onChange={() => {
                                                setCategory(cat);
                                                setCurrentPage(1); // Reset về trang 1 khi chọn category mới
                                                navigate('/danh-sach-san-pham', { 
                                                    state: { categoryName: cat.name_category } 
                                                });
                                            }}
                                        />
                                        {cat.name_category}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2">Khoảng Giá</h3>
                            <div className="space-y-2">
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2"/>
                                    Dưới 40.000đ
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2"/>
                                    40.000đ - 120.000đ
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2"/>
                                    Trên 120.000đ
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product List */}
                <div className="w-3/4">
                    <div className="flex justify-between mb-4">
                        {category ? (
                            <h1 className="text-xl font-semibold">
                                Sản phẩm trong danh mục: {category.name_category}
                            </h1>
                        ) : searchQuery ? (
                            <h1 className="text-xl font-semibold">
                                Kết quả tìm kiếm cho: {searchQuery}
                            </h1>
                        ) : (
                            <h1 className="text-xl font-semibold">
                                Tất cả sản phẩm
                            </h1>
                        )}
                        <div className="flex items-center gap-4">
                            <label>
                                Sắp xếp theo:
                                <select 
                                    className="ml-2 p-1 border rounded" 
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                >
                                    <option>Bán Chạy Tuần</option>
                                    <option>Giá Thấp Đến Cao</option>
                                    <option>Giá Cao Đến Thấp</option>
                                </select>
                            </label>
                            <span>{products.length} sản phẩm</span>
                        </div>
                    </div>
                    {loading ? (
                        <div className="text-center py-8">Đang tải...</div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-8">
                            Không tìm thấy sản phẩm nào trong danh mục này
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-5 gap-4">
                                {currentProducts.map((product, index) => (
                                    <div key={index} className="border p-2 rounded-lg w-[220px] cursor-pointer"
                                         onClick={() => navigate('/chi-tiet-san-pham', { 
                                             state: { 
                                                 productId: product.id,
                                                 productName: product.title,
                                                 productPrice: product.price,
                                                 productImage: product.image,
                                                 productDiscount: product.discount,
                                                 productOldPrice: product.oldPrice,
                                                 categoryName: product.categoryName
                                             } 
                                         })}>
                                        <img 
                                            src={product.image} 
                                            alt={product.title} 
                                            className="w-full h-[160px]"
                                        />
                                        <h3 className="text-sm font-semibold mt-2">
                                            {product.title}
                                        </h3>
                                        <p className="text-red-500 font-bold">{product.price}</p>
                                        {product.oldPrice && (
                                            <p className="text-gray-500 line-through text-sm">{product.oldPrice}</p>
                                        )}
                                        {product.discount && (
                                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                                                {product.discount}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center mt-8 gap-2">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 border rounded disabled:opacity-50"
                                    >
                                        Trước
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`px-4 py-2 border rounded ${
                                                currentPage === page ? 'bg-blue-500 text-white' : ''
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 border rounded disabled:opacity-50"
                                    >
                                        Sau
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
