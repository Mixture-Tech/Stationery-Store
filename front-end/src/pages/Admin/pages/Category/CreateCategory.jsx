import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { categoryParentApi } from '../../../../services/apis/CategoryParentApi';
import { categoryApi } from '../../../../services/apis/categoryApi';

export default function CreateCategory () {
    const navigate = useNavigate();
    const [categoryData, setCategoryData] = useState({
        name_category: '',
        id_parent: '',
        hide: 0
    });
    const [categoryParents, setCategoryParent] = useState([]);
    const [loadingCategoryParent, setLoadingCategoryParent] = useState(true);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchCategoryParent = async () => {
            try {
                const response = await categoryParentApi.getAll();
                setCategoryParent(response);
            } catch (error) {
                console.error('Lỗi khi tải danh mục sản phẩm cha:', error);
                toast.error('Không thể tải danh mục sản phẩm cha');
            } finally {
                setLoadingCategoryParent(false);
            }
        };

        fetchCategoryParent();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategoryData(prev => ({
            ...prev,
            [name]: name === "hide" ? Number(value) :  value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            console.log("Xin chào: ",categoryData);
            await categoryApi.create(categoryData);
            toast.success('Tạo danh mục thành công!');
            setTimeout(() => {
                navigate('/trang-chu-admin');
            }, 1500);
        } catch (error) {
            console.error('Lỗi khi tạo danh mục:', error);
            toast.error('Không thể tạo danh mục');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Tên danh mục */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tên danh mục
                    </label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="id_category">Danh mục sản phẩm</label>
                    <select
                        id="id_parent"
                        name="id_parent"
                        value={categoryData.id_parent}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-navy-blue-500"
                        required
                    >
                        <option value="">Chọn danh mục cha</option>
                        {categoryParents.map(categoryParent => (
                            <option key={categoryParent.id_parent} value={categoryParent.id_parent}>
                                {categoryParent.name_parent}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Trạng thái ẩn/hiện */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Trạng thái
                    </label>
                    <select
                        name="hide"
                        value={categoryData.hide}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-blue-500"
                    >
                        <option value={0}>Ẩn</option>
                        <option value={1}>Hiện</option>
                    </select>
                </div>

                {/* Nút submit */}
                <div className="flex justify-center space-x-4">
                    <button
                        type="submit"
                        className="bg-navy-blue-500 text-white px-6 py-2 rounded-md hover:bg-navy-blue-600 transition-colors duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Đang tạo...' : 'Tạo danh mục'}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};