import PropTypes from 'prop-types';
import EditButton from './EditButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import RoomItem from './RoomItem';

const CardProduct = ({ products }) => {
  // State lưu trạng thái toggle của từng product: { productId: boolean, ... }
  const [toggleStates, setToggleStates] = useState({});

  useEffect(() => {
    // Khởi tạo state cho mỗi product (nếu chưa có)
    const initialStates = {};
    products.forEach(product => {
      initialStates[product.id] = false;
    });
    setToggleStates(initialStates);
  }, [products]);

  const handleCheckboxChange = (id) => {
    setToggleStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <>
      {products.map((product) => (
        <div key={product.id}>
          {/* Hàng thông tin sản phẩm */}
          <div className="grid grid-cols-7 gap-2 mt-2 border rounded-md place-items-center">
            <div className="w-1/2">
              <div className="px-2 py-3 font-nunito text-gray-800 text-center">
                {product.id}
              </div>
            </div>
            <div className="w-full">
              <div className="px-2 py-3 font-nunito text-gray-800 text-center">
                {product.name}
              </div>
            </div>
            <div className="w-full">
              <div className="px-2 py-3 font-nunito text-gray-800 text-center">
                {product.genre}
              </div>
            </div>
            <div className="w-full">
              <div className="px-2 py-3 font-nunito text-gray-800 text-center">
                {product.duration}
              </div>
            </div>
            <div className="w-full">
              <div className="px-2 py-3 font-nunito text-gray-800 text-center">
                {product.subtitle}
              </div>
            </div>
            <div className="w-[100%] text-[12px] flex justify-center">
              <EditButton>
                <FontAwesomeIcon className="text-white" icon={faAngleDown} />
              </EditButton>
            </div>
            <div className="cursor-pointer group">
              <label className="flex cursor-pointer select-none items-center">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={toggleStates[product.id]}
                    onChange={() => handleCheckboxChange(product.id)}
                    className="sr-only peer"
                  />
                  {/* Toggle background */}
                  <div className="block h-8 w-14 rounded-full bg-[#E5E7EB] peer-focus:ring-2 peer-focus:ring-blue-500 peer-checked:bg-blue-500"></div>
                  {/* Toggle dot */}
                  <div className={`dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition-all duration-300 ${toggleStates[product.id] ? "translate-x-6" : ""}`}></div>
                </div>
              </label>
            </div>
          </div>
          {/* Hiển thị RoomItem khi toggle bật */}
          {toggleStates[product.id] && (
            <div className="mt-2">
              <RoomItem product={product} />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

CardProduct.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      isPlaying: PropTypes.string,
    })
  ).isRequired,
};

export default CardProduct;
