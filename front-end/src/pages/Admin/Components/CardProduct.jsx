import PropTypes from 'prop-types';
import EditButton from './EditButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

const CardProduct = ({ products }) => {
  useEffect(() => {
    // Khởi tạo state cho mỗi product (nếu chưa có)
    const initialStates = {};
    products.forEach(product => {
      initialStates[product.id] = false;
    });
  }, [products]);

  // Hàm định dạng giá tiền
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    });
  };

  // Hàm hiển thị trạng thái ẩn/hiện
  const getHideStatus = (hide) => {
    return hide === 0 ? 'Ẩn' : 'Hiện';
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
                {product.nums}
              </div>
            </div>
            <div className="w-full">
              <div className="px-2 py-3 font-nunito text-gray-800 text-center">
                {formatPrice(product.price)}đ
              </div>
            </div>
            <div className="w-full">
              <div className="px-2 py-3 font-nunito text-gray-800 text-center">
                {getHideStatus(product.hide)}
              </div>
            </div>
            <div className="w-full">
              <div className="px-2 py-3 font-nunito text-gray-800 text-center">
                {product.brand}
              </div>
            </div>
            <div className="w-[100%] flex justify-center">
              <EditButton>
                <FontAwesomeIcon className="text-white" icon={faAngleDown} />
              </EditButton>
            </div>
          </div>
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
      nums: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      hide: PropTypes.number.isRequired,
      brand: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CardProduct;
