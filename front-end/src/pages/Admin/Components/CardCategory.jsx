import PropTypes from 'prop-types';
import EditButton from './EditButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

const CardCategory = ({ categories }) => {
  useEffect(() => {
    // Khởi tạo state cho mỗi Category (nếu chưa có)
    const initialStates = {};
    categories.forEach(Category => {
      initialStates[Category.id] = false;
    });
  }, [categories]);

  // Hàm hiển thị trạng thái ẩn/hiện
  const getHideStatus = (hide) => {
    return hide === 0 ? 'Ẩn' : 'Hiện';
  };

  return (
    <>
      {categories.map((category) => (
        <div key={category.id}>
          {/* Hàng thông tin sản phẩm */}
          <div className="grid grid-cols-4 gap-2 mt-2 border rounded-md place-items-center">
            <div className="w-1/2">
              <div className="px-2 py-3 font-nunito text-gray-800 text-center">
                {category.id}
              </div>
            </div>
            <div className="w-full">
              <div className="px-2 py-3 font-nunito text-gray-800 text-center">
                {category.name}
              </div>
            </div>
            <div className="w-full">
              <div className="px-2 py-3 font-nunito text-gray-800 text-center">
                {getHideStatus(category.hide)}
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

CardCategory.propTypes = {
    categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      hide: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CardCategory;
