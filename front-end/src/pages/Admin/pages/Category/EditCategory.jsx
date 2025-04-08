import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faUpload } from '@fortawesome/free-solid-svg-icons';
import { categoryApi } from "../../../../services/apis/categoryApi";
import { productApi } from "../../../../services/apis/productApi";
import { categoryParentApi } from '../../../../services/apis/CategoryParentApi';


export default function EditCategory({ categoryId }) {
    const [categoryData, setCategoryData] = useState({
      name_category: '',
      id_parent: '',
      hide: 0,
    });
    const [categoryParents, setCategoryParent] = useState([]); // Giữ nguyên là mảng
    const [loadingCategoryParent, setLoadingCategoryParent] = useState(true);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchCategoryParent = async () => {
        try {
          const response = await categoryParentApi.getAll();
          setCategoryParent(response); // Gán mảng trực tiếp
        } catch (error) {
          console.error('Lỗi khi tải danh mục sản phẩm cha:', error);
          toast.error('Không thể tải danh mục sản phẩm cha');
        } finally {
          setLoadingCategoryParent(false);
        }
      };
  
      fetchCategoryParent();
    }, []);
  
    useEffect(() => {
      const fetchCategoryData = async () => {
        try {
          const category = await categoryApi.getById(categoryId);
          setCategoryData({
            name_category: category.name_category,
            hide: Number(category.hide),
            id_parent: category.id_parent || '',
          });
        } catch (error) {
          console.error('Lỗi khi tải thông tin danh mục sản phẩm:', error);
          toast.error('Không thể tải thông tin danh mục sản phẩm');
        } finally {
          setLoading(false);
        }
      };
  
      if (categoryId) {
        fetchCategoryData();
      } else {
        setLoading(false);
        toast.error('Không tìm thấy ID danh mục sản phẩm');
      }
    }, [categoryId]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCategoryData((prev) => ({
        ...prev,
        [name]: name === 'hide' ? Number(value) : value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        const finalCategoryData = {
          ...categoryData,
          categoryParent: {
            id_parent: categoryData.id_parent ? Number(categoryData.id_parent) : null,
          },
          hide: Number(categoryData.hide),
        };
  
        console.log('Dữ liệu danh mục sau khi cập nhật:', finalCategoryData);
        await categoryApi.update(categoryId, finalCategoryData); // Sử dụng categoryApi thay vì productApi
        toast.success('Cập nhật danh mục sản phẩm thành công!');
      } catch (error) {
        toast.error('Cập nhật danh mục sản phẩm thất bại!');
        console.error('Lỗi khi cập nhật danh mục:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên danh mục</label>
            <input
              type="text"
              name="name_category"
              value={categoryData.name_category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-blue-500"
              required
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="id_parent">
              Danh mục sản phẩm
            </label>
            <select
              id="id_parent"
              name="id_parent"
              value={categoryData.id_parent}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-navy-blue-500"
            >
              <option value="">Chọn danh mục cha</option>
              {categoryParents.map((categoryParent) => (
                <option key={categoryParent.id_parent} value={categoryParent.id_parent}>
                  {categoryParent.name_parent}
                </option>
              ))}
            </select>
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
            <select
              name="hide"
              value={categoryData.hide}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-blue-500"
            >
              <option value={0}>Hiện</option>
              <option value={1}>Ẩn</option>
            </select>
          </div>
  
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-navy-blue-500 text-white px-6 py-2 rounded-md hover:bg-navy-blue-600 transition-colors duration-300"
              disabled={loading}
            >
              {loading ? 'Đang cập nhật...' : 'Cập nhật danh mục'}
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    );
  }