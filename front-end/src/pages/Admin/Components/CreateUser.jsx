import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faUpload } from '@fortawesome/free-solid-svg-icons';

const CreateUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'USER', // Mặc định là USER
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
                                <p className="text-sm text-gray-500">Chọn ảnh đại diện</p>
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

                {/* Tên người dùng */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tên người dùng
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

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-blue-500"
                        required
                    />
                </div>

                {/* Role */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Vai trò
                    </label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-blue-500"
                    >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                </div>

                {/* Nút submit */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-navy-blue-500 text-white px-6 py-2 rounded-md hover:bg-navy-blue-600 transition-colors duration-300"
                    >
                        Tạo người dùng
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateUser; 