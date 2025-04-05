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
    children: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,  
};
  
export default function SlideProduct({title, categories}) {
    const [tab, setTab] = useState(0);
    const sliderRef = useRef(null);  

    const handleTabChange = (index) => {
        setTab(index);
    }

    // Tính toán settings dựa trên độ dài của categories
    const getSliderSettings = () => {
        const productsLength = categories[tab]?.products.length || 0;
        
        if (productsLength <= 5) {
            return {
                dots: true,
                infinite: false,
                speed: 500,
                slidesToShow: productsLength,
                slidesToScroll: 1,
                arrows: false,
                centerMode: false,
                variableWidth: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: Math.min(3, productsLength),
                            slidesToScroll: 1,
                            variableWidth: true
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: Math.min(2, productsLength),
                            slidesToScroll: 1,
                            variableWidth: true
                        }
                    }
                ]
            };
        } else {
            const slidesToScroll = Math.ceil(productsLength / 5);
            return {
                dots: true,
                infinite: false,
                speed: 500,
                slidesToShow: 5,
                slidesToScroll: slidesToScroll,
                arrows: false,
                centerMode: false,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: Math.ceil(slidesToScroll / 2)
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    }
                ]
            };
        }
    };

    return(
        <div className="w-[65%] flex flex-col items-start shadow-2xl px-6 py-2">
            {/* Tiêu đề */}
            <div className="font-nunito text-2xl font-bold px-4 py-2 text-blue-gray-800">
                {title}
            </div>
            <div className="w-[100%] relative flex items-center justify-start border-b-[1px] border-gray-900">
                {/* Nút chuyển tab */}
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => handleTabChange(index)}
                        className={`px-6 py-2 ${tab === index ? "text-blue-600 font-bold border-b-2 border-blue-400" : "font-semibold"}`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
            <div className="w-full">
                <div className="rounded-lg p-4 sm:p-4 md:p-6">
                    {categories[tab]?.products.length > 0 ? (
                        <Slider ref={sliderRef} {...getSliderSettings()}>
                            {categories[tab]?.products.map((product, index) => (
                                <div key={index} className={`${categories[tab]?.products.length < 5 ? 'pr-3' : 'pr-6'}`} 
                                     style={{ width: categories[tab]?.products.length < 5 ? '152px' : '154px' }}>
                                    <ProductCard {...product} />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <div className="text-center py-8 text-gray-900 text-lg font-nunito font-bold">
                            Tạm thời hết hàng
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

SlideProduct.propTypes = {
    title: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        products: PropTypes.arrayOf(PropTypes.shape({
            src: PropTypes.string,     
            name: PropTypes.string, 
            nums: PropTypes.number,   
            rating: PropTypes.number,  
            price: PropTypes.string, 
            discount: PropTypes.string,   
        }))
    }))
};
