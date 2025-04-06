import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faUpload } from '@fortawesome/free-solid-svg-icons';
import { categoryApi } from "../../../../services/apis/categoryApi";
import { productApi } from "../../../../services/apis/productApi";

export default function CreateProduct() {
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        discount: 0,
        hide: 0,
        nums: '',
        image: '',
        id_category: ''
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    // Fetch danh mục sản phẩm
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryApi.getAll();
                setCategories(response);
            } catch (error) {
                console.error('Lỗi khi tải danh mục sản phẩm:', error);
                toast.error('Không thể tải danh mục sản phẩm');
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({
            ...prev,
            [name]: name === "hide" ? Number(value) : 
                    (name === "price" || name === "nums" || name === "discount") ? Number(value) : value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = '';
            if (imageFile) {
                const uploadResponse = await productApi.uploadImage(imageFile);
                imageUrl = uploadResponse.imageUrl;
            }

            const finalProductData = {
                ...productData,
                image: imageUrl || '',
            };

            await productApi.createProduct(finalProductData);
            toast.success('Tạo sản phẩm thành công!');
            setTimeout(() => {
                navigate('/trang-chu-admin'); // Điều hướng về dashboard admin
            }, 1500);
        } catch (error) {
            toast.error('Tạo sản phẩm thất bại!');
            console.error('Lỗi khi tạo sản phẩm:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loadingCategories) {
        return (
            <div className="w-full flex justify-center items-center p-8">
                <div className="text-lg font-medium">Đang tải dữ liệu...</div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                        {previewImage ? (
                            <img 
                                src={previewImage} 
                                alt="Preview" 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="text-center">
                                <FontAwesomeIcon icon={faImage} className="w-12 h-12 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500">Chọn ảnh sản phẩm</p>
                            </div>
                        )}
                    </div>
                    <label className="cursor-pointer bg-navy-blue-500 text-white px-4 py-2 rounded-md hover:bg-navy-blue-600 transition-colors duration-300">
                        <FontAwesomeIcon icon={faUpload} className="mr-2" />
                        Upload ảnh
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="id_category">Danh mục sản phẩm</label>
                    <select
                        id="id_category"
                        name="id_category"
                        value={productData.id_category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-navy-blue-500"
                        required
                    >
                        <option value="">Chọn danh mục</option>
                        {categories.map(category => (
                            <option key={category.id_category} value={category.id_category}>
                                {category.name_category}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá</label>
                    <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giảm giá</label>
                    <input
                        type="number"
                        name="discount"
                        value={productData.discount}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hàng tồn</label>
                    <input
                        type="number"
                        name="nums"
                        value={productData.nums}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                    <select
                        name="hide"
                        value={productData.hide}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-blue-500"
                    >
                        <option value={0}>Hiện</option>
                        <option value={1}>Ẩn</option>
                    </select>
                </div>

                <div className="flex justify-center space-x-4">
                    <button
                        type="submit"
                        className="bg-navy-blue-500 text-white px-6 py-2 rounded-md hover:bg-navy-blue-600 transition-colors duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Đang tạo...' : 'Tạo sản phẩm'}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}