import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideBar from "../Components/SideBar";
import SubSidebar from "../Components/SubSidebar";
import CardUser from "../Components/CardUser";
import CardProduct from "../Components/CardProduct";
import CreateProduct from "./Product/CreateProduct.jsx";
import CreateCategory from "./Category/CreateCategory.jsx";
import CreateUser from "../Components/CreateUser";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import CardCategory from "../Components/CardCategory";
import { categoryApi } from "../../../services/apis/categoryApi";
import { productApi } from "../../../services/apis/productApi";
import { userApi } from "../../../services/apis/userApi";
import SearchBox from "../Components/SearchBox";
import ProductList from "./Product/ProductList.jsx"; 
import CategoryList from "./Category/CategoryList.jsx";

export default function DashBoard (){
    const [menu, setMenu] = useState(0);
    // const [isFocused, setIsFocused] = useState(false);
    const [activeTab, setActiveTab] = useState('viewAll');
    // const [categories, setCategories] = useState([]);
    // const [products, setProducts] = useState([]);
    // const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [loadingProducts, setLoadingProducts] = useState(true);
    // const [loadingUsers, setLoadingUsers] = useState(true);

    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             const response = await categoryApi.getAll();
    //             setCategories(response);
    //         } catch (error) {
    //             console.error('Lỗi khi lấy danh sách categories:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     const fetchProducts = async () => {
    //         try {
    //             const response = await productApi.getAllProducts();
    //             setProducts(response);
    //         } catch (error) {
    //             console.error('Lỗi khi lấy danh sách products:', error);
    //         } finally {
    //             setLoadingProducts(false);
    //         }
    //     };

    //     const fetchUsers = async () => {
    //         try {
    //             const response = await userApi.getAllUsers();
    //             setUsers(response);
    //         } catch (error) {
    //             console.error('Lỗi khi lấy danh sách users:', error);
    //         } finally {
    //             setLoadingUsers(false);
    //         }
    //     };

    //     fetchCategories();
    //     fetchProducts();
    //     fetchUsers();
        
    // }, []);

    // Hàm xử lý khi click vào menu
    const handleMenuChange = (newMenu) => {
        setMenu(newMenu);
        setActiveTab('viewAll'); // Reset về viewAll khi chuyển menu
    };

    return (
        <main>
            <div className="container min-h-screen">
                <div className="flex gap-[0.5%] p-6">
                    {/* Sidebar */}
                    <SideBar menu={menu} setMenu={handleMenuChange}></SideBar>

                    {/* SubSidebar - Chỉ hiển thị khi menu là 0, 1, hoặc 2 */}
                    {(menu === 0 || menu === 1 || menu === 2) && (
                        <SubSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                    )}

                    {/* Content */}
                    <div className="flex-1">
                        <div className="w-full min-h-screen p-4 bg-white shadow-lg border-2 rounded-xl">
                            {/* User Management */}
                            {/* {menu === 0 && activeTab === 'viewAll' && <UserList />} */}

                            {/* Category Management */}
                            {menu === 1 && activeTab === 'viewAll' && <CategoryList />}

                            {/* Product Management */}
                            {menu === 2 && activeTab === 'viewAll' && <ProductList />}

                            {/* Create Forms */}
                            {activeTab === 'create' && (
                                <div className="flex flex-col w-full">
                                    <h2 className="text-2xl font-bold mb-4">
                                        {menu === 0 ? 'Create New User' : 
                                         menu === 1 ? 'Thêm loại mới' : 
                                         'Thêm sản phẩm mới'}
                                    </h2>
                                    {/* {menu === 0 && <CreateUser />} */}
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
