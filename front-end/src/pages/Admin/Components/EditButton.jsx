import { useState } from 'react';
import { faAngleDown, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { productApi } from '../../../services/apis/productApi';
import { toast } from 'react-toastify';
import { categoryApi } from '../../../services/apis/categoryApi';

const EditButton = ({ productId, categoryId, onDeleteSuccess, onEditProduct, onEditCategory }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleEditCategory = () => {
        onEditCategory(categoryId);
    }

    const handleEditProduct = () => {
        onEditProduct(productId);
    }

    const handleEdit = () => {
        if(productId){
            handleEditProduct();
        }
        else if(categoryId){
            handleEditCategory();
        }
    };

    const handleDelete = async () => {
        const confirmMessage = productId 
            ? 'Bạn có chắc chắn muốn ẩn sản phẩm này?' 
            : 'Bạn có chắc chắn muốn ẩn danh mục này?';
            
        if (window.confirm(confirmMessage)) {
            setIsDeleting(true);
            try {
                if (productId) {
                    await productApi.hideProduct(productId);
                    toast.success('Ẩn sản phẩm thành công!');
                } else if (categoryId) {
                    await categoryApi.hideCategory(categoryId);
                    toast.success('Ẩn danh mục thành công!');
                }
                
                if (onDeleteSuccess) {
                    onDeleteSuccess(productId || categoryId);
                }
            } catch (error) {
                console.error('Lỗi khi ẩn mục:', error);
                toast.error('Thao tác thất bại!');
            } finally {
                setIsDeleting(false);
            }
        }
    };

    const items = [
        { icon: faTrash, label: "Ẩn", action: handleDelete, disabled: isDeleting },
        { icon: faPenToSquare, label: "Chỉnh sửa", action: handleEdit }
    ];

    return (
        <div className="group relative w-[60%] py-1 px-2 rounded-md bg-primary-400 text-white font-nunito bg-navy-blue-500 flex justify-center">
            <button className="text-white hover:text-yellow-500 flex items-center space-x-1 whitespace-nowrap">
                <span className='text-[12px]'>Chỉnh Sửa</span>
                <FontAwesomeIcon 
                    icon={faAngleDown} 
                    className="w-3 ml-1 transform rotate-180 transition-transform duration-300 ease-in-out group-hover:rotate-0"
                />
            </button>
            <div className="w-[3/4] absolute left-2 top-6 mt-2 rounded-md shadow-lg bg-navy-blue-500 opacity-0 invisible 
                            group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-2">
                <div className="rounded-md ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className={`block px-4 py-2 text-sm text-white rounded hover:bg-navy-blue-400 hover:text-white transition-colors duration-150 whitespace-nowrap cursor-pointer ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={item.disabled ? undefined : item.action}
                            >
                                <FontAwesomeIcon 
                                    icon={item.icon}
                                    className="w-3 mr-2"
                                />
                                {item.label}
                                {item.disabled && item.label === "Ẩn" && " (Đang xử lý...)"}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditButton;