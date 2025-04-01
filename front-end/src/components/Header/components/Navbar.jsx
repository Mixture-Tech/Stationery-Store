import Logo from "../../../assets/img/Logo/Logo.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import { CustomTransparentButton } from "../../Forms/Button/customColor";
import { categoryParentApi } from '../../../services/apis/CategoryParentApi';
import { categoryApi } from '../../../services/apis/categoryApi';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = ({ title, data, navigate }) => {
    const flattenData = (data) => {
        if (!data || Object.keys(data).length === 0) {
            return {};
        }

        let result = {};
    
        Object.keys(data).forEach((category) => {
            result[category] = {};
    
            Object.keys(data[category]).forEach((subCategory) => {
                result[category][subCategory] = Object.keys(data[category][subCategory]).map((subject) => ({
                    name: subject,
                    path: data[category][subCategory][subject]
                }));
            });
        });
    
        return result;
    };

    const flattenedItems = flattenData(data);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    // Khi hover vào dropdown, set category đầu tiên
    const handleMouseEnter = () => {
        setIsHovered(true);
        if (Object.keys(flattenedItems).length > 0) {
            setSelectedCategory(Object.keys(flattenedItems)[0]);
        }
    };

    if (!data || Object.keys(data).length === 0) {
        return (
            <div className="group relative inline-block">
                <button className="text-white hover:text-yellow-500 flex items-center space-x-1">
                    <span>{title}</span>
                    <FontAwesomeIcon 
                        icon={faAngleDown} 
                        className="w-4 h-4 ml-1 transform rotate-180 transition-transform duration-300 ease-in-out
                                 group-hover:rotate-0"
                    />
                </button>
            </div>
        );
    }

    return (
        <div className="group relative inline-block" onMouseEnter={handleMouseEnter}>
            <button className="text-white hover:text-yellow-500 flex items-center space-x-1">
                <span>{title}</span>
                <FontAwesomeIcon 
                    icon={faAngleDown} 
                    className="w-4 h-4 ml-1 transform rotate-180 transition-transform duration-300 ease-in-out
                             group-hover:rotate-0"
                />
            </button>
            <div className="absolute left-0 mt-2 min-w-[1000px] rounded-md shadow-lg bg-blue-700 opacity-0 invisible 
                          group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="rounded-md ring-1 ring-black ring-opacity-5">
                    <div className="py-2 px-4">
                        <div className="flex gap-[1%] flex-wrap content-start">
                            <div className="w-[30%] h-3/4 p-2">
                                <div className="font-nunito text-[22px] text-white">
                                    Danh Mục Sản Phẩm
                                </div>
                                {Object.keys(flattenedItems).map((category, index) => (
                                    <div key={index} className={`block p-2 text-[15px] text-white hover:bg-gray-500
                                                hover:text-white transition-colors duration-150 ${selectedCategory === category ? 'bg-gray-500': 'text-white'}`}
                                                onMouseEnter={()=> setSelectedCategory(category)}>
                                        {category}
                                    </div>
                                ))}
                            </div>
                            <div className="grow h-3/4 border-l-[1px] border-gray-700">
                                <div className="w-[100%] p-2">
                                    <div className="font-nunito text-[20px] text-white">{selectedCategory}</div>
                                    <div className="flex flex-col gap-4">
                                        {(() => {
                                            const subCategories = Object.keys(flattenedItems[selectedCategory] || {});
                                            
                                            return (
                                                <>
                                                    {subCategories.map((subCategory, subIndex) => {
                                                        const subjects = flattenedItems[selectedCategory]?.[subCategory] || [];
                                                        const midPoint = Math.ceil(subjects.length / 2);
                                                        const firstRowSubjects = subjects.slice(0, midPoint);
                                                        const secondRowSubjects = subjects.slice(midPoint);

                                                        return (
                                                            <div key={subIndex} className="flex flex-col gap-2">
                                                                <div className="text-white font-semibold">{subCategory}</div>
                                                                <div className="grid grid-cols-2 gap-x-2">
                                                                    <div className="flex flex-col">
                                                                        {firstRowSubjects.map((subject, subjectIndex) => (
                                                                            <div
                                                                                key={subjectIndex}
                                                                                onClick={() => navigate('/danh-sach-san-pham', { 
                                                                                    state: { categoryName: subject.name } 
                                                                                })}
                                                                                className="block p-1 text-sm text-white hover:text-yellow-500 transition-colors duration-150 cursor-pointer"
                                                                            >
                                                                                {subject.name}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    <div className="flex flex-col">
                                                                        {secondRowSubjects.map((subject, subjectIndex) => (
                                                                            <div
                                                                                key={subjectIndex}
                                                                                onClick={() => navigate('/danh-sach-san-pham', { 
                                                                                    state: { categoryName: subject.name } 
                                                                                })}
                                                                                className="block p-1 text-sm text-white hover:text-yellow-500 transition-colors duration-150 cursor-pointer"
                                                                            >
                                                                                {subject.name}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </>
                                            );
                                        })()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

DropdownMenu.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired
};

export default function Navbar() {
    const [isFocused, setIsFocused] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryData, setCategoryData] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate('/danh-sach-san-pham', { 
                state: { searchQuery: searchQuery.trim() } 
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy danh sách category parent
                const parentResponse = await categoryParentApi.getAll();
                const parentData = parentResponse;

                // Lấy ngẫu nhiên 5 category parent
                const randomParents = parentData
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 5);

                // Lấy dữ liệu cho mỗi category parent
                const processedData = {};
                await Promise.all(
                    randomParents.map(async (parent) => {
                        // Lấy danh sách category con
                        const categoriesResponse = await categoryApi.getByParentId(parent.id_parent);
                        const categories = categoriesResponse;

                        // Tạo cấu trúc dữ liệu cho menu
                        processedData[parent.name_parent] = {
                            "": categories.reduce((acc, category) => {
                                acc[category.name_category] = {
                                    "Sản phẩm": {
                                        [category.name_category]: `/danh-muc/${parent.name_parent.toLowerCase()}/${category.name_category.toLowerCase()}`
                                    }
                                };
                                return acc;
                            }, {})
                        };
                    })
                );

                setCategoryData(processedData);
                setCategories(randomParents.map(parent => ({
                    name: parent.name_parent,
                    path: `/danh-muc/${parent.name_parent.toLowerCase()}`
                })));
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <nav id="header" className="fixed top-0 z-30 w-full bg-transparent ">
            <div className="w-full h-[60px] bg-blue-800 shadow-lg flex items-center justify-between">
                <div className="w-[100%] hidden md:flex space-x-14 text-white items-center justify-center mx-auto">
                    <div className="flex justify-center items-center">
                        <a href="/" className="hover:scale-125">
                            <img src={Logo} alt="Logo" className="h-12 rounded-full overflow-hidden" />
                        </a>
                    </div>

                    <DropdownMenu title="Danh Mục" data={categoryData} navigate={navigate} />
                                    
                    <div onClick={() => navigate('/danh-sach-san-pham')} className="cursor-pointer hover:text-yellow-500">
                       Sản Phẩm
                    </div>
                    <a href="/ve-chung-toi" className=" hover:text-yellow-500">
                        About Us
                    </a>
                    <div className={`w-[20%] relative transition-all duration-300 ${isFocused ? 'shadow-lg' : 'shadow-md'}`}>
                        <form onSubmit={handleSearch} className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FontAwesomeIcon 
                                    icon={faMagnifyingGlass} 
                                    className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-Dark-Blue-300' : 'text-gray-400'}`}
                                />
                            </div>
                            <input 
                                type="search" 
                                id="default-search" 
                                className="block w-full p-1 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg 
                                        bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                        transition-all duration-300 ease-in-out
                                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-Dark-Blue-400" 
                                placeholder="Tìm kiếm sản phẩm..." 
                                required 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />
                        </form>
                    </div>
                    <div className="relative justify-center items-center flex flex-row">                 
                        <a href="/dang-nhap" className="hover:bg-slate-500 
                                            text-white font-bold text-xs py-2 px-4 rounded-xl">
                            Đăng Nhập
                        </a>
                        <CustomTransparentButton>
                            <a href="/gio-hang">
                                <FontAwesomeIcon icon={faCartShopping} size="lg" />
                            </a>
                        </CustomTransparentButton>
                        <CustomTransparentButton>
                            <a>
                                <FontAwesomeIcon icon={faBell} size="lg" />
                            </a>
                        </CustomTransparentButton>
                    </div>  
                </div>
            </div>
        </nav>
    );
}
