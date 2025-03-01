import Logo from "../../assets/img/Logo/Logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const categories = [
    { name: "Phim Hành Động", path: "/the-loai/hanh-dong" },
    { name: "Phim Tình Cảm", path: "/the-loai/tinh-cam" },
    { name: "Phim Kinh Dị", path: "/the-loai/kinh-di" },
    { name: "Phim Hài", path: "/the-loai/hai" },
    { name: "Phim Hoạt Hình", path: "/the-loai/hoat-hinh" },
    { name: "Phim Viễn Tưởng", path: "/the-loai/vien-tuong" },
    { name: "Phim Cổ Trang", path: "/the-loai/co-trang" },
];

const countries = [
    { name: "Phim Hàn Quốc", path: "/quoc-gia/han-quoc" },
    { name: "Phim Trung Quốc", path: "/quoc-gia/trung-quoc" },
    { name: "Phim Nhật Bản", path: "/quoc-gia/nhat-ban" },
    { name: "Phim Thái Lan", path: "/quoc-gia/thai-lan" },
    { name: "Phim Âu Mỹ", path: "/quoc-gia/au-my" },
    { name: "Phim Việt Nam", path: "/quoc-gia/viet-nam" },
];

const DropdownMenu = ({ items, title }) => {
    return (
        <div className="group relative inline-block">
            <button className="text-white hover:text-yellow-500 flex items-center space-x-1">
                <span>{title}</span>
                <FontAwesomeIcon 
                    icon={faAngleDown} 
                    className="w-4 h-4 ml-1 transform rotate-180 transition-transform duration-300 ease-in-out
                             group-hover:rotate-0 "
                />
            </button>
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-slate-500 opacity-0 invisible 
                          group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="rounded-md ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        {items.map((item, index) => (
                            <a
                                key={index}
                                href={item.path}
                                className="block px-4 py-2 text-sm text-white hover:bg-yellow-500
                                         hover:text-white transition-colors duration-150"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
DropdownMenu.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired
};


export default function Navbar() {
    const [isFocused, setIsFocused] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    
    return (
        <nav id="header" className="fixed top-0 z-30 w-full bg-transparent ">
            <div className="h-[60px] bg-blue-800 shadow-lg flex items-center justify-between">
                {/* Hamburger Menu for Small Screens */}
                <div className="flex items-center md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
                    </button>
                </div>
                {/* Mid (Nav Links) */}
                <div className="hidden md:flex space-x-12 text-white items-center mx-auto">
                    {/*  (Logo) */}
                    <div className="flex justify-center items-center">
                        <img src={Logo} alt="Logo" className="h-12 rounded-full overflow-hidden" />
                    </div>

                    <a href="/" className="text-Light-Cream-500 hover:text-yellow-500">
                        Trang Chủ
                    </a>
                    <DropdownMenu title="Thể Loại" items={categories} >
                        <FontAwesomeIcon className="text-white" icon={faAngleDown} />
                    </DropdownMenu>
                        
                    <DropdownMenu title="Quốc Gia" items={countries} />                
                    <a href="/menu" className=" hover:text-yellow-500">
                        Phim mới
                    </a>
                    <a href="/contact" className=" hover:text-yellow-500">
                        Phim bộ
                    </a>
                    <a href="/support" className=" hover:text-yellow-500">
                        Blog
                    </a>
                    <div className="max-w-4xl mx-auto pb-2 pt-2">   
                        <div className={`relative transition-all duration-300 ${isFocused ? 'shadow-lg' : 'shadow-md'}`}>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FontAwesomeIcon 
                                    icon={faMagnifyingGlass} 
                                    className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-Dark-Blue-300' : 'text-gray-400'}`}
                                />
                            </div>
                            <input 
                            type="search" 
                            id="default-search" 
                            className="block w-full p-1  pl-12 text-sm text-gray-900 border border-gray-300 rounded-lg 
                                        bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                        transition-all duration-300 ease-in-out
                                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-Dark-Blue-400" 
                            placeholder="Search..." 
                            required 
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            />
                            
                        </div>
                    </div>
                    <div className="relative">
                    
                        <a href="/login" className="hover:bg-slate-500 
                                            text-white font-bold text-xs py-2 px-4 rounded-xl">
                            Đăng Nhập
                        </a>
                    </div>  
                    {/* Mobile Menu */}
                    <div className={`md:hidden fixed top-0 left-0 w-full h-full bg-[#252631] transition-transform transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} z-20`}>
                        <div className="flex flex-col items-center justify-center h-full space-y-6">
                            <a href="/" className="text-white text-lg hover:text-yellow-500" onClick={toggleMenu}>Home</a>
                            <a href="/reviews" className="text-white text-lg hover:text-yellow-500" onClick={toggleMenu}>Movies</a>
                            <a href="/about" className="text-white text-lg hover:text-yellow-500" onClick={toggleMenu}>About</a>
                            <a href="/menu" className="text-white text-lg hover:text-yellow-500" onClick={toggleMenu}>Menu</a>
                            <a href="/contact" className="text-white text-lg hover:text-yellow-500" onClick={toggleMenu}>Contact</a>
                            <a href="/support" className="text-white text-lg hover:text-yellow-500" onClick={toggleMenu}>Policy</a>
                            <button className="border-2 border-Bright-Pink-300 border-solid hover:bg-Bright-Pink-300 text-white font-bold text-xs py-2 px-4 rounded-xl" onClick={toggleMenu}>
                                Đăng Nhập
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}