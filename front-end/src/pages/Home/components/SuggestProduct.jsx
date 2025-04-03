import ProductCard from "./ProductCard";
import PropTypes from 'prop-types';
import { useState } from 'react';

const SuggestProduct = ({products}) => {
    const [displayCount, setDisplayCount] = useState(10);

    const handleShowMore = () => {
        setDisplayCount(prev => prev + 10);
    };

    return (
        <div className="w-[60%] shadow-2xl">
            <div className="relative flex items-center justify-center bg-blue-400 text-white py-3 rounded-t-lg shadow-lg">
                <span className="text-lg font-semibold">✨ Gợi ý cho bạn ✨</span>
                <div className="absolute left-4">
                    <span className="text-white text-2xl">📖</span> 
                </div>
                <div className="absolute right-4">
                    <span className="text-white text-2xl">👍</span> 
                </div>
            </div>
            <div className="flex flex-wrap p-2">
                {products.slice(0, displayCount).map((product, index) => (
                    <div key={index} className="px-2 w-[22%] mb-4 shadow-lg">
                        <ProductCard {...product}/>
                    </div>
                ))}
            </div>
            {displayCount < products.length && (
                <div className="flex justify-center pb-4">
                    <button 
                        onClick={handleShowMore}
                        className="px-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    >
                        Xem thêm
                    </button>
                </div>
            )}
        </div>  
    )
}

SuggestProduct.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string.isRequired,     
        name: PropTypes.string.isRequired, 
        nums: PropTypes.number.isRequired,   
        rating: PropTypes.number.isRequired,  
        price: PropTypes.string.isRequired, 
        discount: PropTypes.string.isRequired,  
    })).isRequired
};

export default SuggestProduct;