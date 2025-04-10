import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Item = ({ item, onQuantityChange, onRemove, selected, onSelectItem }) => {
    const total = item.productPrice * item.quantity;

    const handleQuantityChange = (newQuantity) => {
        onQuantityChange(item.id_product, newQuantity);
    };

    const handleRemove = () => {
        onRemove(item.id_product);
    };

    const handleSelect = (e) => {
        onSelectItem(item.id_product, e.target.checked);
    };

    const formatCurrency = (amount) => {
        if (isNaN(amount) || amount === 0) {
            return '0 ₫';
        }
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 3,
            maximumFractionDigits: 3
        }).format(amount);
    };

    return (
        <div className="flex items-center justify-between w-full p-4 mb-4 bg-white border-2 rounded-lg shadow">
            <div className="flex items-center space-x-4">
                <input 
                    type="checkbox" 
                    className="w-4 h-4" 
                    checked={selected}
                    onChange={handleSelect}
                />
                <img 
                    src={item.productImage} 
                    alt={item.productName} 
                    className="w-20 h-20 object-cover rounded"
                />
                <div>
                    <h3 className="font-semibold">{item.productName}</h3>
                    <p className="text-sm text-gray-500">{item.productDescription}</p>
                </div>
            </div>
            <div className="flex items-center space-x-20">
                <span className="font-semibold">{formatCurrency(item.productPrice)}</span>
                <div className="flex items-center space-x-2">
                    <button 
                        className="px-2 py-1 border rounded"
                        onClick={() => handleQuantityChange(item.quantity - 1)}
                    >
                        -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                        className="px-2 py-1 border rounded"
                        onClick={() => handleQuantityChange(item.quantity + 1)}
                    >
                        +
                    </button>
                </div>
                <span className="font-semibold">{formatCurrency(item.productPrice * item.quantity)}</span>
                <button 
                    className="text-red-500 hover:text-red-700"
                    onClick={handleRemove}
                >
                    Xóa
                </button>
            </div>
        </div>
    );
};

Item.propTypes = {
    item: PropTypes.shape({
        id_product: PropTypes.number.isRequired,
        productImage: PropTypes.string.isRequired,
        productName: PropTypes.string.isRequired,
        productDescription: PropTypes.string,
        productPrice: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
    }).isRequired,
    onQuantityChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
    onSelectItem: PropTypes.func.isRequired,
};

export default Item;