import Logo from "../../../assets/img/Logo/Logo.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import { CustomTransparentButton } from "../../Forms/Button/customColor";

const categories = [
    { name: "Phim Hành Động", path: "/the-loai/hanh-dong" },
    { name: "Phim Tình Cảm", path: "/the-loai/tinh-cam" },
    { name: "Phim Kinh Dị", path: "/the-loai/kinh-di" },
    { name: "Phim Hài", path: "/the-loai/hai" },
    { name: "Phim Hoạt Hình", path: "/the-loai/hoat-hinh" },
    { name: "Phim Viễn Tưởng", path: "/the-loai/vien-tuong" },
    { name: "Phim Cổ Trang", path: "/the-loai/co-trang" },
];
const dataRight = {
    "Sách Trong Nước": {
      "Văn Học": {
        "Toán": "/danh-muc/sach-trong-nuoc/van-hoc/toan",
        "Lý": "/danh-muc/sach-trong-nuoc/van-hoc/ly",
        "Hóa": "/danh-muc/sach-trong-nuoc/van-hoc/hoa",
        "Sinh": "/danh-muc/sach-trong-nuoc/van-hoc/sinh",
        "Văn": "/danh-muc/sach-trong-nuoc/van-hoc/van"
      },
      "Kinh Tế": {
        "Toán": "/danh-muc/sach-trong-nuoc/van-hoc/toan",
        "Lý": "/danh-muc/sach-trong-nuoc/van-hoc/ly",
        "Hóa": "/danh-muc/sach-trong-nuoc/van-hoc/hoa",
        "Sinh": "/danh-muc/sach-trong-nuoc/van-hoc/sinh",
        "Văn": "/danh-muc/sach-trong-nuoc/van-hoc/van"
      },
      "Kinh Tế 2": {
        "Toán": "/danh-muc/sach-trong-nuoc/van-hoc/toan",
        "Lý": "/danh-muc/sach-trong-nuoc/van-hoc/ly",
        "Hóa": "/danh-muc/sach-trong-nuoc/van-hoc/hoa",
        "Sinh": "/danh-muc/sach-trong-nuoc/van-hoc/sinh",
        "Văn": "/danh-muc/sach-trong-nuoc/van-hoc/van"
      },
      "Kinh Tế 3": {
        "Toán": "/danh-muc/sach-trong-nuoc/van-hoc/toan",
        "Lý": "/danh-muc/sach-trong-nuoc/van-hoc/ly",
        "Hóa": "/danh-muc/sach-trong-nuoc/van-hoc/hoa",
        "Sinh": "/danh-muc/sach-trong-nuoc/van-hoc/sinh",
        "Văn": "/danh-muc/sach-trong-nuoc/van-hoc/van"
      },
      "Kinh Tế 4": {
        "Toán": "/danh-muc/sach-trong-nuoc/van-hoc/toan",
        "Lý": "/danh-muc/sach-trong-nuoc/van-hoc/ly",
        "Hóa": "/danh-muc/sach-trong-nuoc/van-hoc/hoa",
        "Sinh": "/danh-muc/sach-trong-nuoc/van-hoc/sinh",
        "Văn": "/danh-muc/sach-trong-nuoc/van-hoc/van"
      }
    },
    "Đồ Chơi":{
        "Đồ chơi nổi bật:":{
            "Đồ chơi giáo dục 1": "/danh-muc/sach-trong-nuoc/van-hoc/van",
            "Đồ chơi giáo dục 2": "/danh-muc/sach-trong-nuoc/van-hoc/van",
            "Đồ chơi giáo dục 3": "/danh-muc/sach-trong-nuoc/van-hoc/van",
            "Đồ chơi giáo dục 4": "/danh-muc/sach-trong-nuoc/van-hoc/van"
        },
        "Đồ chơi nổi bật 1:":{
            "Đồ chơi giáo dục 1": "/danh-muc/sach-trong-nuoc/van-hoc/van",
            "Đồ chơi giáo dục 2": "/danh-muc/sach-trong-nuoc/van-hoc/van",
            "Đồ chơi giáo dục 3": "/danh-muc/sach-trong-nuoc/van-hoc/van",
            "Đồ chơi giáo dục 4": "/danh-muc/sach-trong-nuoc/van-hoc/van"
        },
        "Đồ chơi nổi bật 2:":{
            "Đồ chơi giáo dục 1": "/danh-muc/sach-trong-nuoc/van-hoc/van",
            "Đồ chơi giáo dục 2": "/danh-muc/sach-trong-nuoc/van-hoc/van",
            "Đồ chơi giáo dục 3": "/danh-muc/sach-trong-nuoc/van-hoc/van",
            "Đồ chơi giáo dục 4": "/danh-muc/sach-trong-nuoc/van-hoc/van"
        },
        "Đồ chơi nổi bật 3:":{
            "Đồ chơi giáo dục 1": "/danh-muc/sach-trong-nuoc/van-hoc/van",
            "Đồ chơi giáo dục 2": "/danh-muc/sach-trong-nuoc/van-hoc/van",
            "Đồ chơi giáo dục 3": "/danh-muc/sach-trong-nuoc/van-hoc/van",
            "Đồ chơi giáo dục 4": "/danh-muc/sach-trong-nuoc/van-hoc/van"
        }
    }
};
  
  
  
 

const DropdownMenu = ({ title, data }) => {
    const flattenData = (data) => {
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
    const [selectedCategory, setSelectedCategory] = useState(Object.keys(flattenedItems)[0]); // Chọn category đầu tiên mặc định

    return (

        <div className=" group relative inline-block">
            <button className="text-white hover:text-yellow-500 flex items-center space-x-1">
                <span>{title}</span>
                <FontAwesomeIcon 
                    icon={faAngleDown} 
                    className="w-4 h-4 ml-1 transform rotate-180 transition-transform duration-300 ease-in-out
                             group-hover:rotate-0 "
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
                                    <div className="flex flex-wrap gap-4 space-x-4">
                                        {Object.keys(flattenedItems[selectedCategory]).map((subCategory, subIndex) =>(
                                            <div key={subIndex} className="mt-2">
                                                <div className="text-white font-semibold">{subCategory}</div>
                                                    {flattenedItems[selectedCategory][subCategory].map((subject, subjectIndex) => (
                                                        <a
                                                            key={subjectIndex}
                                                            href={subject.path}
                                                            className="block p-1 text-sm text-white hover:text-yellow-500 transition-colors duration-150"
                                                        >
                                                            {subject.name}  {/* Đảm bảo hiển thị đúng tên của subject */}
                                                        </a>
                                                    ))}
                                            </div>
                                        ))}
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
    data: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string,
            name: PropTypes.string
        })
    ),
    items: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired
};


export default function Navbar() {
    const [isFocused, setIsFocused] = useState(false);
    // const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Toggle menu function
    // const toggleMenu = () => {
    //     setIsMenuOpen(!isMenuOpen);
    // };


    return (
        <nav id="header" className="fixed top-0 z-30 w-full bg-transparent ">
            <div className="w-full h-[60px] bg-blue-800 shadow-lg flex items-center justify-between">
                <div className="w-[100%] hidden md:flex space-x-14 text-white items-center justify-center mx-auto">
                    {/*  (Logo) */}
                    <div className="flex justify-center items-center">
                        <a href="/" className="hover:scale-125">
                            <img src={Logo} alt="Logo" className="h-12 rounded-full overflow-hidden" />
                        </a>
                    </div>

                    <DropdownMenu title="Danh Mục" items={categories} data={dataRight} >
                        <FontAwesomeIcon className="text-white" icon={faAngleDown} />
                    </DropdownMenu>
                                    
                    <a href="/menu" className=" hover:text-yellow-500">
                       Sản Phẩm
                    </a>
                    <a href="/support" className=" hover:text-yellow-500">
                        About Us
                    </a>
                    <div className={`w-[20%] relative transition-all duration-300 ${isFocused ? 'shadow-lg' : 'shadow-md'}`}>
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
                            placeholder="Search..." 
                            required 
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            />
                            
                    </div>
                    <div className="relative justify-center items-center flex flex-row">                 
                        <a href="/dang-nhap" className="hover:bg-slate-500 
                                            text-white font-bold text-xs py-2 px-4 rounded-xl">
                            Đăng Nhập
                        </a>
                        <CustomTransparentButton>
                            <a>
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
