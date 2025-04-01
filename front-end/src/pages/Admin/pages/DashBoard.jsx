import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideBar from "../Components/SideBar";
import SubSidebar from "../Components/SubSidebar";
import CardUser from "../Components/CardUser";
import CardProduct from "../Components/CardProduct";
import CreateProduct from "../Components/CreateProduct";
import CreateCategory from "../Components/CreateCategory";
import CreateUser from "../Components/CreateUser";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import CardCategory from "../Components/CardCategory";
import { categoryApi } from "../../../services/apis/categoryApi";
import { productApi } from "../../../services/apis/productApi";
import { userApi } from "../../../services/apis/userApi";
import SearchBox from "../Components/SearchBox";

const DashBoard = () => {
    const [menu, setMenu] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const [activeTab, setActiveTab] = useState('viewAll');
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingUsers, setLoadingUsers] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryApi.getAll();
                setCategories(response);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách categories:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await productApi.getAllProducts();
                setProducts(response);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách products:', error);
            } finally {
                setLoadingProducts(false);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await userApi.getAllUsers();
                setUsers(response);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách users:', error);
            } finally {
                setLoadingUsers(false);
            }
        };

        fetchCategories();
        fetchProducts();
        fetchUsers();
        
    }, []);

    // Hàm xử lý khi click vào menu
    const handleMenuChange = (newMenu) => {
        setMenu(newMenu);
        setActiveTab('viewAll'); // Reset về viewAll khi chuyển menu
    };

    return (
        <main>
            <div className="container min-h-screen mt-16">
                <div className="flex gap-[1%] p-6">
                    {/* Sidebar */}
                    <SideBar menu={menu} setMenu={handleMenuChange}></SideBar>

                    {/* SubSidebar - Chỉ hiển thị khi menu là 0, 1, hoặc 2 */}
                    {(menu === 0 || menu === 1 || menu === 2) && (
                        <SubSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                    )}

                    {/* Content */}
                    <div className="flex-1">
                        <div className="w-full min-h-screen p-4 bg-white shadow-lg border-2 rounded-xl">
                            {/* Action User (menu === 0) */}
                            {menu === 0 && activeTab === 'viewAll' && (
                                <div className="flex flex-col w-full">
                                    <SearchBox width="15%" />
                                    {/* Hàng tiêu đề (Header) */}
                                    <div className="grid grid-cols-6 gap-6 bg-gray-200 rounded-md">
                                        {["ID", "Tên", "Email", "Create At", "Role","Action"].map((label, index) => (
                                            <div key={index} className="px-2 py-3 font-nunito font-bold text-gray-600 text-center">
                                                {label}
                                            </div>
                                        ))}
                                    </div>
                                    {loadingUsers ? (
                                        <div className="text-center py-4">Đang tải...</div>
                                    ) : users.length === 0 ? (
                                        <div className="text-center py-4 font-nunito font-bold text-gray-500">Chưa có dữ liệu người dùng</div>
                                    ) : (
                                        <CardUser users={users}/>
                                    )}
                                </div>
                            )}

                            {/* Action Category (menu === 1) */}
                            {menu === 1 && activeTab === 'viewAll' && (
                                <div className="flex flex-col w-full">
                                    <SearchBox width="15%" />
                                    {/* Hàng tiêu đề (Header) */}
                                    <div className="grid grid-cols-4 gap-4 bg-gray-200 rounded-md place-items-center">
                                        {[
                                            { label: "ID" },
                                            { label: "Tên" },
                                            { label: "Ẩn/Hiện" },
                                            { label: "Action" },
                                        ].map((item, index) => (
                                            <div key={index} className="px-2 py-3 font-nunito font-bold text-gray-600 text-center">
                                                {item.label}
                                            </div>
                                        ))}
                                    </div>
                                    {loading ? (
                                        <div className="text-center py-4">Đang tải...</div>
                                    ) : categories.length === 0 ? (
                                        <div className="text-center py-4 font-nunito font-bold text-gray-500">Chưa có dữ liệu danh mục</div>
                                    ) : (
                                        <CardCategory categories={categories}/>
                                    )}
                                </div>
                            )}

                            {/* Action Product (menu === 2) */}
                            {menu === 2 && activeTab === 'viewAll' && (
                                <div className="flex flex-col w-full">
                                    <SearchBox width="15%" />
                                    {/* Hàng tiêu đề (Header) */}
                                    <div className="grid grid-cols-[0.3fr_1.6fr_0.7fr_0.5fr_0.5fr_0.5fr_0.9fr] gap-4 bg-gray-200 rounded-md place-items-center">
                                        {[
                                            { label: "ID" },
                                            { label: "Tên" },
                                            { label: "Hàng Tồn" },
                                            { label: "Giá" },
                                            { label: "Ẩn/Hiện" },
                                            {label: "Hãng"},
                                            { label: "Action" },
                                        ].map((item, index) => (
                                            <div key={index} className="px-2 py-3 font-nunito font-bold text-gray-600 text-center">
                                                {item.label}
                                            </div>
                                        ))}
                                    </div>
                                    {loadingProducts ? (
                                        <div className="text-center py-4">Đang tải...</div>
                                    ) : products.length === 0 ? (
                                        <div className="text-center py-4 font-nunito font-bold text-gray-500">Chưa có dữ liệu sản phẩm</div>
                                    ) : (
                                        <CardProduct products={products}/>   
                                    )}
                                </div>
                            )}

                            {/* Create Forms */}
                            {activeTab === 'create' && (
                                <div className="flex flex-col w-full">
                                    <h2 className="text-2xl font-bold mb-4">
                                        {menu === 0 ? 'Create New User' : 
                                         menu === 1 ? 'Create New Category' : 
                                         'Create New Product'}
                                    </h2>
                                    {menu === 0 && <CreateUser />}
                                    {menu === 1 && <CreateCategory />}
                                    {menu === 2 && <CreateProduct />}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DashBoard;
