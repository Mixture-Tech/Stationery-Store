import { useState } from "react";
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

const users = [
    {id:1, name: "Nguyen Van A", email: "khai@nguyen.com", createAt: "12:30 PM", role: "ADMIN"},
    {id:2, name: "Nguyen Van A", email: "khai@nguyen.com", createAt: "12:30 PM", role: "USER"},
    {id:3, name: "Nguyen Van A", email: "khai@nguyen.com", createAt: "12:30 PM", role: "USER"},
    {id:4, name: "Nguyen Van A", email: "khai@nguyen.com", createAt: "12:30 PM", role: "USER"},
    {id:5, name: "Nguyen Van A", email: "khai@nguyen.com", createAt: "12:30 PM", role: "USER"},
    {id:6, name: "Nguyen Van A", email: "khai@nguyen.com", createAt: "12:30 PM", role: "USER"},
    {id:7, name: "Nguyen Van A", email: "khai@nguyen.com", createAt: "12:30 PM", role: "USER"},
];
const products = [
    { id: 1, name: "Sách giáo khoa", nums: 3, price: 3, brand: "Kim Long", hide: 0 }, 
    { id: 2, name: "Bút bi", nums: 3, price: 5, brand: "Kim Long", hide: 1 }, 
    { id: 3, name: "Vở học sinh", nums: 3, price: 15, brand: "Kim Long", hide: 1 }, 
    { id: 4, name: "Thước kẻ", nums: 3, price: 8, brand: "Kim Long", hide: 0 }
];

const categories = [
    { id: 1, name: "Sách giáo khoa", hide: 0 }, 
    { id: 2, name: "Bút bi", hide: 1 }, 
    { id: 3, name: "Vở học sinh",  hide: 1 }, 
    { id: 4, name: "Thước kẻ", hide: 0 }
];

const DashBoard = () => {
    const [menu, setMenu] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const [activeTab, setActiveTab] = useState('viewAll');

    // Hàm xử lý khi click vào menu
    const handleMenuChange = (newMenu) => {
        setMenu(newMenu);
        setActiveTab('viewAll'); // Reset về viewAll khi chuyển menu
    };

    return (
        <main>
            <div className="container min-h-screen mt-16">
                <div className="flex gap-[1%] flex-wrap content-start p-6">
                    {/* Sidebar */}
                    <SideBar menu={menu} setMenu={handleMenuChange}></SideBar>

                    {/* SubSidebar - Chỉ hiển thị khi menu là 0, 1, hoặc 2 */}
                    {(menu === 0 || menu === 1 || menu === 2) && (
                        <SubSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                    )}

                    {/* Content */}
                    <div className="grow h-full">
                        <div className="w-[100%] min-h-screen p-6 bg-white shadow-lg border-2 rounded-xl">
                            {/* Action User (menu === 0) */}
                            {menu === 0 && activeTab === 'viewAll' && (
                                <div className="flex flex-col w-full">
                                    <div className="w-[15%]">
                                        <div className={` mb-4 relative transition-all duration-300 ${isFocused ? 'shadow-lg' : 'shadow-md'}`}>
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FontAwesomeIcon 
                                                    icon={faMagnifyingGlass} 
                                                    className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-Dark-Blue-300' : 'text-gray-400'}`}
                                                />
                                            </div>
                                            <input 
                                            type="search" 
                                            id="default-search" 
                                            className="block w-full p-2 pl-12 text-sm rounded-lg 
                                                        bg-white
                                                        transition-all duration-300 ease-in-out" 
                                            placeholder="Search..." 
                                            required 
                                            onFocus={() => setIsFocused(true)}
                                            onBlur={() => setIsFocused(false)}
                                            />
                                        </div>
                                    </div>
                                    {/* Hàng tiêu đề (Header) */}
                                    <div className="grid grid-cols-6 gap-6 bg-gray-200 rounded-md">
                                        {["ID", "Tên", "Email", "Create At", "Role","Action"].map((label, index) => (
                                            <div key={index} className="px-2 py-3 font-nunito font-bold text-gray-600 text-center">
                                                {label}
                                            </div>
                                        ))}
                                    </div>
                                    <CardUser users={users}/>
                                </div>
                            )}

                            {/* Action Category (menu === 1) */}
                            {menu === 1 && activeTab === 'viewAll' && (
                                <div className="flex flex-col w-full">
                                    <div className="w-[15%]">
                                        <div className={` mb-4 relative transition-all duration-300 ${isFocused ? 'shadow-lg' : 'shadow-md'}`}>
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FontAwesomeIcon 
                                                    icon={faMagnifyingGlass} 
                                                    className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-Dark-Blue-300' : 'text-gray-400'}`}
                                                />
                                            </div>
                                            <input 
                                            type="search" 
                                            id="default-search" 
                                            className="block w-full p-2 pl-12 text-sm rounded-lg 
                                                        bg-white
                                                        transition-all duration-300 ease-in-out" 
                                            placeholder="Search..." 
                                            required 
                                            onFocus={() => setIsFocused(true)}
                                            onBlur={() => setIsFocused(false)}
                                            />
                                        </div>
                                    </div>
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
                                    {/* TODO: Add CategoryCard component here */}
                                    <CardCategory categories={categories}/>
                                </div>
                            )}

                            {/* Action Product (menu === 2) */}
                            {menu === 2 && activeTab === 'viewAll' && (
                                <div className="flex flex-col w-full">
                                    <div className="w-[15%]">
                                        <div className={` mb-4 relative transition-all duration-300 ${isFocused ? 'shadow-lg' : 'shadow-md'}`}>
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FontAwesomeIcon 
                                                    icon={faMagnifyingGlass} 
                                                    className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-Dark-Blue-300' : 'text-gray-400'}`}
                                                />
                                            </div>
                                            <input 
                                            type="search" 
                                            id="default-search" 
                                            className="block w-full p-2 pl-12 text-sm rounded-lg 
                                                        bg-white
                                                        transition-all duration-300 ease-in-out" 
                                            placeholder="Search..." 
                                            required 
                                            onFocus={() => setIsFocused(true)}
                                            onBlur={() => setIsFocused(false)}
                                            />
                                        </div>
                                    </div>
                                    {/* Hàng tiêu đề (Header) */}
                                    <div className="grid grid-cols-7 gap-4 bg-gray-200 rounded-md place-items-center">
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
                                    <CardProduct products={products}/>   
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
