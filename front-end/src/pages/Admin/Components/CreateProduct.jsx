import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faUpload } from '@fortawesome/free-solid-svg-icons';

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        hide: 0,
        brand: '',
        nums: '',
        image: null
    });
    const [previewImage, setPreviewImage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file
            }));
            // Tạo URL để preview ảnh
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Xử lý submit form
        console.log('Form data:', formData);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Upload ảnh */}
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

                {/* Tên sản phẩm */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tên sản phẩm
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-blue-500"
                        required
                    />
                </div>

                {/* Giá */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Giá
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-blue-500"
                        required
                    />
                </div>

                {/* Trạng thái ẩn/hiện */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Trạng thái
                    </label>
                    <select
                        name="hide"
                        value={formData.hide}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-blue-500"
                    >
                        <option value={0}>Ẩn</option>
                        <option value={1}>Hiện</option>
                    </select>
                </div>

                {/* Thương hiệu */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Thương hiệu
                    </label>
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-blue-500"
                        required
                    />
                </div>

                {/* Hàng tồn */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hàng tồn
                    </label>
                    <input
                        type="number"
                        name="nums"
                        value={formData.nums}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-blue-500"
                        required
                    />
                </div>

                {/* Nút submit */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-navy-blue-500 text-white px-6 py-2 rounded-md hover:bg-navy-blue-600 transition-colors duration-300"
                    >
                        Tạo sản phẩm
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProduct; 