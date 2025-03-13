import PropTypes from 'prop-types';
import { Star } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCard = ({ src, title, genre, rating, subtitle }) => {
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
  
    return (
      <div className="w-full h-auto rounded-lg overflow-hidden hover:shadow-lg shadow-xl hover:border-2 border-black flex flex-col mb-1">
        <div className="relative flex-grow">
          <img src={src} alt="Movie Poster" className="w-full h-full object-cover hover:scale-110" />
        </div>
        <div className="p-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center mb-2">
              {renderStars(rating)}
              {rating !== 0 && <span className="text-yellow-400 text-xs sm:text-sm mr-1 ml-3">{rating.toFixed(1)}</span>}
            </div>
            <h2 className="text-gray-900 mb-2 text-xs font-nunito font-thin line-clamp-2 mt-2 h-4 ">{title}</h2>
          </div>
          <div className="flex flex-col gap-2 justify-between items-start">
            <span className="text-red-500 text-xs font-nunito font-semibold border-2 border-transparent">{genre}</span>
            <span className="text-black text-xs font-nunito font-thin border-2 border-transparent">{subtitle}</span>
          </div>
        </div>
      </div>
    );
  };
  ProductCard.propTypes = {
    src: PropTypes.string.isRequired,     
    title: PropTypes.string.isRequired, 
    genre: PropTypes.string.isRequired,  
    rating: PropTypes.number.isRequired,  
    subtitle: PropTypes.string.isRequired,     
  };

export default ProductCard;