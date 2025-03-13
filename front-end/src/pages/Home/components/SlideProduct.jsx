import {useRef, useState } from "react";
import PropTypes from 'prop-types';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
  
  const Button = ({ children, onClick, isActive }) => (
    <button 
    type="button" 
    onClick={onClick} 
    className={`h-8 px-8 font-nunito font-bold text-xs text-white rounded-full 
                ${isActive ? 'bg-button-500 text-slate-500' : ''} 
                hover:bg-title-800 transition-colors`}
  >
    {children}
  </button>
  );
  
  Button.propTypes = {
      children : PropTypes.string,
      onClick : PropTypes.func.isRequired,
      isActive: PropTypes.bool.isRequired,  
  };
  
export default function SlideProduct({title}) {
    const [tab, setTab] = useState(0);
    const sliderRef = useRef(null);  

    const handleTabChange = (index) => {
        setTab(index);
    }

    // Settings cho Slider
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        arrows: false,
        responsive: [
            
        ]
    };
      
    // Dữ liệu phim cho các danh mục khác nhau
    const movieData = {
        0: [
            { src: "https://placehold.co/1200x1000", title: "Sách Lập Trình JavaScript", genre: "200.000 VND", rating: 4.5, subtitle: "500 đã bán" },
            { src: "https://placehold.co/1200x1000", title: "Sách Python Cơ Bản", genre: "250.000 VND", rating: 4.7, subtitle: "750 đã bán" },
            { src: "https://placehold.co/1200x1000", title: "Sách React Nâng Cao", genre: "300.000 VND", rating: 4.9, subtitle: "600 đã bán" },
            { src: "https://placehold.co/1200x1000", title: "Sách Node.js Thực Hành", genre: "280.000 VND", rating: 4.6, subtitle: "420 đã bán" },
            { src: "https://placehold.co/1200x1000", title: "Sách Data Science với Python", genre: "320.000 VND", rating: 4.8, subtitle: "380 đã bán" },
            { src: "https://placehold.co/1200x1000", title: "Sách Kiến Thức SQL", genre: "150.000 VND", rating: 4.3, subtitle: "900 đã bán" },
        ],
        1: [
            { src: "https://placehold.co/1200x1000", title: "Sách Lập Trình JavaScript 1", genre: "200.000 VND", rating: 4.5, subtitle: "500 đã bán" },
            { src: "https://placehold.co/1200x1000", title: "Sách Python Cơ Bản 2", genre: "250.000 VND", rating: 4.7, subtitle: "750 đã bán" },
            { src: "https://placehold.co/1200x1000", title: "Sách React Nâng Cao 3", genre: "300.000 VND", rating: 4.9, subtitle: "600 đã bán" },
            { src: "https://placehold.co/1200x1000", title: "Sách Node.js Thực Hành 4", genre: "280.000 VND", rating: 4.6, subtitle: "420 đã bán" },
            { src: "https://placehold.co/1200x1000", title: "Sách Data Science với Python 5", genre: "320.000 VND", rating: 4.8, subtitle: "380 đã bán" },
            { src: "https://placehold.co/1200x1000", title: "Sách Kiến Thức SQL 6", genre: "150.000 VND", rating: 4.3, subtitle: "900 đã bán" },
        ],
        2: [
            { src: "https://placehold.co/1200x1000", title: "Sách Lập Trình JavaScript", genre: "200.000 VND", rating: 4.5, subtitle: "500 đã bán" },
            { src: "https://placehold.co/1200x1000", title: "Sách Python Cơ Bản", genre: "250.000 VND", rating: 4.7, subtitle: "750 đã bán" },
            { src: "https://placehold.co/1200x1000", title: "Sách React Nâng Cao", genre: "300.000 VND", rating: 4.9, subtitle: "600 đã bán" },
            { src: "https://placehold.co/1200x1000", title: "Sách Node.js Thực Hành", genre: "280.000 VND", rating: 4.6, subtitle: "420 đã bán" },
            { src: "https://placehold.co/1200x1000", title: "Sách Data Science với Python", genre: "320.000 VND", rating: 4.8, subtitle: "380 đã bán" },
            { src: "https://placehold.co/1200x1000", title: "Sách Kiến Thức SQL", genre: "150.000 VND", rating: 4.3, subtitle: "900 đã bán" },
        ]
        };

    return(
        <div className="w-[60%] flex flex-col items-start shadow-2xl px-6 py-2">
            {/* Tiêu đ�� */}
            <div className="font-nunito text-2xl font-bold px-4 py-2 text-blue-gray-800">
                {title}
            </div>
            <div className="w-[100%] relative flex items-center justify-start border-b-[1px] border-gray-900">
                {/* Nút chuyển tab */}
                {["Lập Trình", "Khoa Học", "Kinh Tế"].map((label, index) => (
                    <button
                        key={index}
                        onClick={() => handleTabChange(index)}
                        className={`px-6 py-2 ${tab === index ? "text-blue-600 font-bold border-b-2 border-blue-400" : "font-semibold"}`}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <div className="w-full">
                    <div className="rounded-lg p-2 sm:p-4 md:p-6">
                            <Slider ref={sliderRef} {...settings}>
                            {movieData[tab] && movieData[tab].map((movie, index) => (
                                <div key={index} className="px-4">
                                <ProductCard {...movie} />
                                </div>
                            ))}
                            </Slider>
                    </div>
            </div>
        </div>
    )
}

SlideProduct.propTypes = {
    title: PropTypes.string.isRequired,
};
