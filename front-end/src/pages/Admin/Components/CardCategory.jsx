import PropTypes from 'prop-types';
import EditButton from './EditButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { categoryParentApi } from '../../../services/apis/CategoryParentApi';

const CardCategory = ({ categories, onCategoryDelete, onEditCategory }) => {
  const [categoryParents, setCategoryParents] = useState({}); // Khởi tạo là object thay vì mảng
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryParents = async () => {
      try {
        const response = await categoryParentApi.getAll();
        // Chuyển mảng response thành object map
        const categoryParentMap = response.reduce((acc, categoryParent) => {
          acc[categoryParent.id_parent] = categoryParent.name_parent;
          return acc;
        }, {});
        setCategoryParents(categoryParentMap); // Gán object map vào state
      } catch (error) {
        console.error('Lỗi khi tải danh mục sản phẩm cha:', error);
        toast.error('Không thể tải danh mục sản phẩm cha');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryParents();
  }, []);

  const getHideStatus = (hide) => {
    return hide ? 'Ẩn' : 'Hiện';
  };

  const getCategoryParentName = (id_parent) => {
    return categoryParents[id_parent] || 'Chưa phân loại';
  };

  const handleDeleteSuccess = (deletedCategoryId) => {
    if (onCategoryDelete) {
      onCategoryDelete(deletedCategoryId);
    }
  };

  return (
    <>
      {categories.map((category) => (
        <div key={category.id_category}>
          <div className="grid grid-cols-4 gap-2 mt-2 border rounded-md place-items-center">
            <div className="w-1/2">
              <div className="px-2 py-3 font-nunito text-gray-800 text-center">
                {category.name_category}
              </div>
            </div>
            <div className="w-full">
              <div className="px-2 py-3 font-nunito text-gray-800 text-center">
                {getCategoryParentName(category.id_parent)}
              </div>
            </div>
            <div className="w-full">
              <div className="px-2 py-3 font-nunito text-gray-800 text-center">
                {getHideStatus(category.hide)}
              </div>
            </div>
            <div className="w-[100%] flex justify-center">
              <EditButton
                categoryId={category.id_category}
                onDeleteSuccess={handleDeleteSuccess}
                onEditCategory={onEditCategory}
              />
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
      id_category: PropTypes.number.isRequired,
      name_category: PropTypes.string.isRequired,
      hide: PropTypes.number.isRequired,
    })
  ).isRequired,
  onCategoryDelete: PropTypes.func,
  onEditCategory: PropTypes.func,
};

export default CardCategory;
