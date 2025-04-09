import PropTypes from 'prop-types';
import { Star, ShoppingCart, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { addToCart } from "../../../services/apis/cartApi";

const ProductCard = ({ 
    id, 
    src, 
    name, 
    rating, 
    price, 
    discount, 
    discountPrice, 
    categoryName,
    onAddToCartSuccess,
    onAddToCartError 
}) => {
    const navigate = useNavigate();

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

    const handleAddToCart = async (e) => {
        e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
        try {
            await addToCart(id, 1);
            onAddToCartSuccess && onAddToCartSuccess();
        } catch (error) {
            onAddToCartError && onAddToCartError(error.message || 'Có lỗi xảy ra khi thêm vào giỏ hàng');
        }
    };

    const handleBuyNow = (e) => {
        e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
        navigate('/thanh-toan', {
            state: {
                products: [{
                    id_product: id,
                    productImage: src,
                    productName: name,
                    productPrice: discountPrice,
                    quantity: 1,
                }]
            }
        });
    };

    return (
        <div className="w-[145px] group h-auto rounded-lg overflow-hidden hover:shadow-2xl shadow-xl flex flex-col mb-1">
            <div className="relative flex-grow" onClick={handleProductClick}>
                <img src={src} alt="Product" className="w-full h-[120px] object-cover group-hover:scale-110 transition duration-200" />
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
                <div className="flex gap-2 mt-2">
                    <button 
                        onClick={handleAddToCart}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white p-1 rounded flex items-center justify-center gap-1 text-xs"
                    >
                        <ShoppingCart size={14} />
                        <span>Thêm</span>
                    </button>
                    <button 
                        onClick={handleBuyNow}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white p-1 rounded flex items-center justify-center gap-1 text-xs"
                    >
                        <Zap size={14} />
                        <span>Mua</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    id: PropTypes.string,
    src: PropTypes.string,
    name: PropTypes.string,
    rating: PropTypes.number,
    price: PropTypes.string,
    discount: PropTypes.string,
    discountPrice: PropTypes.string,
    categoryName: PropTypes.string,
    onAddToCartSuccess: PropTypes.func,
    onAddToCartError: PropTypes.func
};

export default ProductCard;
