import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideBar from "../Components/SideBar";
import CardUser from "../Components/CardUser";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import CardProduct from "../Components/CardProduct";

const users = [
    {id:1, name: "Nguyen Van A", email: "khai@nguyen.com", createAt: "12:30 PM"},
    {id:2, name: "Nguyen Van A", email: "khai@nguyen.com", createAt: "12:30 PM"},
    {id:3, name: "Nguyen Van A", email: "khai@nguyen.com", createAt: "12:30 PM"},
    {id:4, name: "Nguyen Van A", email: "khai@nguyen.com", createAt: "12:30 PM"},
    {id:5, name: "Nguyen Van A", email: "khai@nguyen.com", createAt: "12:30 PM"},
    {id:6, name: "Nguyen Van A", email: "khai@nguyen.com", createAt: "12:30 PM"},
    {id:7, name: "Nguyen Van A", email: "khai@nguyen.com", createAt: "12:30 PM"},
];
const products = [
    { id: 1, name: "Inception", genre: "Sci-Fi", duration: "148 min", subtitle: "English" }, 
    { id: 2, name: "Titanic", genre: "Romance", duration: "195 min", subtitle: "English" }, 
    { id: 3, name: "Parasite", genre: "Thriller", duration: "132 min", subtitle: "Korean" }, 
    { id: 4, name: "Spirited Away", genre: "Animation", duration: "125 min", subtitle: "Japanese" }
];

const DashBoard = () => {
    const [menu, setMenu] = useState(0);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <main>
            <div className="container min-h-screen mt-16">
                <div className="flex gap-[1%] flex-wrap content-start p-6">
                    {/* Sidebar */}
                    <SideBar menu={menu} setMenu={setMenu}></SideBar>

                    {/* Content */}
                    <div className="grow h-full">
                        <div className="w-[100%] min-h-screen p-6 bg-white shadow-lg border-2 rounded-xl">
                            {/* Action User (Chỉ hiển thị nếu menu === 0) */}
                            {menu === 0 && (
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
                                    <div className="grid grid-cols-5 gap-6 bg-gray-200 rounded-md">
                                        {["ID", "Name", "Email", "Online At", "Action"].map((label, index) => (
                                            <div key={index} className="px-2 py-3 font-nunito font-bold text-gray-600 text-center">
                                                {label}
                                            </div>
                                        ))}
                                    </div>
                                    <CardUser users={users}/>
                                </div>

                            )}

                            {/* Action Film (Chỉ hiển thị nếu menu === 1) */}
                            {menu === 1 && (
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
                                            { label: "Name" },
                                            { label: "Genre" },
                                            { label: "Duration" },
                                            { label: "Subtitle" },
                                            { label: "Action" },
                                            { label: "Create Room" },
                                        ].map((item, index) => (
                                            <div key={index} className="px-2 py-3 font-nunito font-bold text-gray-600 text-center">
                                                {item.label}
                                            </div>
                                        ))}
                                    </div>
                                    <CardProduct products={products}/>   
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
