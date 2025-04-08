import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideBar from "../Components/SideBar";
import SubSidebar from "../Components/SubSidebar";
import CardUser from "../Components/CardUser";
import CardProduct from "../Components/CardProduct";
import CreateProduct from "./Product/CreateProduct.jsx";
import EditProduct from "./Product/EditProduct.jsx"; // Thêm import EditProduct
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
import EditCategory from "./Category/EditCategory.jsx";

export default function DashBoard() {
    const [menu, setMenu] = useState(0);
    const [activeTab, setActiveTab] = useState('viewAll');
    const [selectedProductId, setSelectedProductId] = useState(null); // Thêm state để lưu productId
    const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Thêm state để lưu categoryId

    // Hàm xử lý khi click vào menu
    const handleMenuChange = (newMenu) => {
        setMenu(newMenu);
        setActiveTab('viewAll'); // Reset về viewAll khi chuyển menu
        setSelectedProductId(null); // Reset productId khi chuyển menu
    };

    // Hàm xử lý khi chọn chỉnh sửa sản phẩm
    const handleEditProduct = (productId) => {
        setActiveTab('edit');
        setSelectedProductId(productId);
    };

    const handleEditCategory = (categoryId) => {
        setActiveTab('edit');
        setSelectedCategoryId(categoryId);
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
                            {menu === 1 && activeTab === 'viewAll' && (
                                <CategoryList onEditCategory={handleEditCategory}/>
                            )}

                            {/* Product Management */}
                            {menu === 2 && activeTab === 'viewAll' && (
                                <ProductList onEditProduct={handleEditProduct} /> // Truyền hàm handleEditProduct
                            )}

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

                            {/* Edit Category */}
                            {menu === 1 && activeTab === 'edit' && selectedCategoryId && (
                                <div className="flex flex-col w-full">
                                    <h2 className="text-2xl font-bold mb-4">Chỉnh sửa danh mục sản phẩm</h2>
                                    <EditCategory categoryId={selectedCategoryId} />
                                </div>
                            )}

                            {/* Edit Product */}
                            {menu === 2 && activeTab === 'edit' && selectedProductId && (
                                <div className="flex flex-col w-full">
                                    <h2 className="text-2xl font-bold mb-4">Chỉnh sửa sản phẩm</h2>
                                    <EditProduct productId={selectedProductId} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}