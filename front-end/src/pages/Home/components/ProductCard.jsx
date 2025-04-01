import PropTypes from 'prop-types';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';  // Thêm import useNavigate
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCard = ({ id, src, name, rating, price, discount, discountPrice, categoryName }) => {
    const navigate = useNavigate();  // Khởi tạo useNavigate

    const renderStars = (rating) => {
        if (rating === 0) {
            return <span className="text-gray-900 text-base font-nunito">Hết Hàng</span>;
        }

        const stars = [];
        const fullStars = Math.floor(rating);
        const decimalPart = rating - fullStars;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />);
            } else if (i === fullStars + 1 && decimalPart > 0.25) {
                stars.push(
                    <div key={i} className="relative w-4 h-4">
                        <Star className="w-4 h-4 text-gray-600 fill-current absolute" />
                        <div className="overflow-hidden absolute" style={{width: `${decimalPart * 100}%`}}>
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        </div>
                    </div>
                );
            } else {
                stars.push(<Star key={i} className="w-4 h-4 text-gray-600 fill-current" />);
            }
        }
        return stars;
    };

    const handleProductClick = () => {
        // Điều hướng đến trang chi tiết sản phẩm
        navigate(`/chi-tiet-san-pham`, {
            state: {
                productId: id,
                productName: name,
                productPrice: `${discountPrice} đ`,
                productImage: src,
                productDiscount: `-${discount}%`,
                productOldPrice: price,
                categoryName: categoryName,
            }
        });
    };

    return (
        <div className="w-[140px] h-auto rounded-lg overflow-hidden hover:shadow-lg shadow-xl hover:border-2 border-black flex flex-col mb-1">
            <div className="relative flex-grow" onClick={handleProductClick}>  {/* Thêm onClick */}
                <img src={src} alt="Product" className="w-full h-[120px] object-cover hover:scale-110" />
            </div>
            <div className="p-2 flex flex-col justify-between">
                <div>
                    <div className="flex items-center mb-2">
                        {renderStars(rating)}
                        {rating !== 0 && <span className="text-yellow-400 text-xs sm:text-sm mr-1 ml-3">{rating.toFixed(1)}</span>}
                    </div>
                    <h2 className="text-gray-900 mb-2 text-xs font-nunito font-thin line-clamp-2 mt-2 h-4">{name}</h2>
                </div>
                <div className="flex flex-col gap-2 justify-between items-start">
                    <span className="text-red-500 text-xs font-nunito font-semibold border-2 border-transparent">Giảm: {discount}%</span>
                    <span className="text-black text-xs font-nunito font-thin border-2 border-transparent">{price}</span>
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    discount: PropTypes.string.isRequired,
    discountPrice: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
};

export default ProductCard;
