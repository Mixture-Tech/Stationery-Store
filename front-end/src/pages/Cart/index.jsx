import React, { useContext, useState, useCallback, useMemo, useEffect } from "react";
import { faChevronLeft, faChevronRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import TableHeader from "./components/TableHeader";
import Item from "./components/Item";
import OrderSummary from "./components/OrderSummary";
import { CartContext } from "../../context/CartContext";
import { getCart, updateCartItem, removeFromCart } from "../../services/apis/cartApi";
import { toast } from "react-toastify";
import { productApi } from '../../services/apis/ProductApi';
import { useNavigate } from "react-router-dom";

const Table = React.memo(function ItemCarouse({ items, onQuantityChange, onRemove, selectedItems, onSelectItem, selectAll, onSelectAll }) {
    return (
        <div className="flex flex-col w-full px-40 mt-10">
            <TableHeader selectAll={selectAll} onSelectAll={onSelectAll} />
            {items.map((item) => (
                <Item 
                    key={item.id_product} 
                    item={item} 
                    onQuantityChange={onQuantityChange} 
                    onRemove={onRemove} 
                    selected={selectedItems.includes(item.id_product)} 
                    onSelectItem={onSelectItem} 
                />
            ))}
        </div>
    );
});

Table.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id_product: PropTypes.number.isRequired,
            productImage: PropTypes.string.isRequired,
            productName: PropTypes.string.isRequired,
            productPrice: PropTypes.number.isRequired,
            quantity: PropTypes.number.isRequired,
        }),
    ).isRequired,
    onQuantityChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    selectedItems: PropTypes.arrayOf(PropTypes.number).isRequired,
    onSelectItem: PropTypes.func.isRequired,
    selectAll: PropTypes.bool.isRequired,
    onSelectAll: PropTypes.func.isRequired,
};

const ItemCarousel = React.memo(function ItemCarousel({ image, title, price }) {
    const formattedPrice = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
    return (
        <div className="flex flex-col items-start justify-center w-48 shadow p-2">
            <img className="object-cover w-48 h-48 rounded-lg" src={image} alt={title} />
            <p className="mt-2 mb-2 text-lg font-bold h-14 line-clamp-2 hover:line-clamp-none">{title}</p>
            <p className="my-3 text-sm text-Light-Apricot-500">{formattedPrice}</p>
            <button className="w-full px-3 py-2 font-semibold text-white rounded-lg bg-indigo-600 hover:bg-indigo-500">
                Đặt hàng ngay
            </button>
        </div>
    );
});

ItemCarousel.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

const Carousel = React.memo(function Carousel({ items }) {
    const [startIndex, setStartIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setStartIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, [items.length]);

    const prevSlide = useCallback(() => {
        setStartIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    }, [items.length]);

    const visibleItems = useMemo(() => {
        return [...items.slice(startIndex), ...items.slice(0, startIndex)].slice(0, 6);
    }, [items, startIndex]);

    return (
        <div className="container relative w-full mx-auto">
            <div className="flex flex-row items-center justify-center w-full gap-4 py-10 overflow-hidden rounded-lg">
                {visibleItems.map((item, index) => (
                    <ItemCarousel key={index} image={item.image} title={item.name} price={item.price} />
                ))}
            </div>
            <button
                onClick={prevSlide}
                className="absolute w-10 h-10 p-2 transition-all transform -translate-y-1/2 rounded-full bg-Coral-Pink-500 left-15 top-1/2 hover:bg-opacity-75"
            >
                <FontAwesomeIcon icon={faChevronLeft} className="w-6 h-6 text-indigo-600" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-0 w-10 h-10 p-2 transition-all transform -translate-y-1/2 rounded-full bg-Coral-Pink-500 top-1/2 hover:bg-opacity-75"
            >
                <FontAwesomeIcon icon={faChevronRight} className="w-6 h-6 text-indigo-600" />
            </button>
            <div className="absolute flex flex-row w-full gap-2 transform -translate-x-1/2 bottom-2 left-[97%]">
                {items.map((_, i) => (
                    <div
                        key={i}
                        onClick={() => setStartIndex(i)}
                        className={`w-2 h-2 rounded-full cursor-pointer ${
                            i === startIndex ? "bg-Coral-Pink-500" : "bg-gray-300"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
});

Carousel.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            productImage: PropTypes.string.isRequired,
            productName: PropTypes.string.isRequired,
            productPrice: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [popularProducts, setPopularProducts] = useState([]);
    const [discountCode, setDiscountCode] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        const fetchPopularProducts = async () => {
            try {
                const response = await productApi.getAllProducts();
                const allProducts = response;
                // Lấy ngẫu nhiên 5 sản phẩm
                const randomProducts = allProducts
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 5);
                setPopularProducts(randomProducts);
            } catch (error) {
                console.error("Error fetching popular products:", error);
            }
        };

        fetchPopularProducts();
    }, []);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                setLoading(true);
                const response = await getCart();
                setCartItems(response);
            } catch (error) {
                toast.error("Không thể tải dữ liệu giỏ hàng");
                console.error("Error fetching cart:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const DELIVERY_FEE = 15000;

    useEffect(() => {
        const storedDiscountCode = sessionStorage.getItem("dicountCode");
        if (storedDiscountCode) {
            setDiscountCode(storedDiscountCode);
        }
    }, []);

    const handleDiscountCodeChange = (e) => {
        const code = e.target.value;
        setDiscountCode(code);
        sessionStorage.setItem("dicountCode", code);
    };

    const calculateOrderTotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0);
    }, [cartItems]);

    const handleQuantityChange = useCallback(
        async (id_product, newQuantity) => {
            if (newQuantity < 1) return;
            try {
                await updateCartItem(id_product, newQuantity);
                setCartItems(prevItems =>
                    prevItems.map(item =>
                        item.id_product === id_product ? { ...item, quantity: newQuantity } : item
                    )
                );
                toast.success("Cập nhật số lượng thành công");
            } catch (error) {
                toast.error("Không thể cập nhật số lượng");
                console.error("Error updating quantity:", error);
            }
        },
        []
    );

    const handleRemoveItem = useCallback(
        async (id_product) => {
            try {
                // Gọi API để xóa sản phẩm khỏi database
                await removeFromCart(id_product);
                
                // Cập nhật state local sau khi xóa thành công
                setCartItems(prevItems => prevItems.filter(item => item.id_product !== id_product));
                
                // Cập nhật selectedItems để loại bỏ sản phẩm đã xóa
                setSelectedItems(prev => prev.filter(id => id !== id_product));
                
                // Kiểm tra nếu không còn sản phẩm nào được chọn, tắt selectAll
                if (selectedItems.length === 1 && selectedItems[0] === id_product) {
                    setSelectAll(false);
                }

                toast.success("Xóa sản phẩm khỏi giỏ hàng thành công");
            } catch (error) {
                toast.error("Không thể xóa sản phẩm");
                console.error("Error removing item:", error);
            }
        },
        [selectedItems]
    );

    const total = useMemo(() => {
        const discountedTotal = calculateOrderTotal - calculateOrderTotal * (discountCode ? 0.1 : 0);
        return discountedTotal + DELIVERY_FEE;
    }, [calculateOrderTotal, discountCode]);

    const handleSelectAll = (checked) => {
        setSelectAll(checked);
        if (checked) {
            setSelectedItems(cartItems.map(item => item.id_product));
        } else {
            setSelectedItems([]);
        }
    };

    const handleSelectItem = (id_product, checked) => {
        if (checked) {
            setSelectedItems(prev => [...prev, id_product]);
        } else {
            setSelectedItems(prev => prev.filter(id => id !== id_product));
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <div className="w-16 h-16 border-4 border-Coral-Pink-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center w-full pt-20">
            <div className="flex flex-row items-center justify-between w-full max-w-6xl">
                <h1 className="text-3xl font-semibold text-Coral-Pink-500">Giỏ hàng</h1>
                <div className="relative flex items-center p-2 ml-10 bg-white border-2 rounded-lg border-Coral-Pink-500">
                    <FontAwesomeIcon icon={faSearch} className="w-5 h-5 text-Coral-Pink-500" />
                    <input type="text" placeholder="Tìm kiếm" className="w-full pl-2 border-none focus:outline-none" />
                </div>
            </div>

            <Table 
                items={cartItems} 
                onQuantityChange={handleQuantityChange} 
                onRemove={handleRemoveItem}
                selectedItems={selectedItems}
                onSelectItem={handleSelectItem}
                selectAll={selectAll}
                onSelectAll={handleSelectAll}
            />

            <div className="flex flex-row items-center justify-end w-full px-40 mt-4">
                <div className="flex flex-row px-2 py-2 border-2 rounded-lg border-Coral-Pink-500">
                    <span className="px-4 font-semibold text-md text-slate-400">Discount</span>
                    <input
                        type="text"
                        placeholder="Add discount code"
                        value={discountCode}
                        onChange={handleDiscountCodeChange}
                        className="w-full pl-6 border-none rounded-lg text-md focus:outline-none"
                    />
                </div>
            </div>
            <div className="w-full px-40 mt-5">
                <OrderSummary
                    cart={cartItems}
                    order={calculateOrderTotal}
                    offers={discountCode}
                    delivery={DELIVERY_FEE}
                    total={total}
                />
            </div>
            <div className="w-full px-40 mt-5">
                <div className="w-full p-4 bg-white">
                    <h2 className="mb-4 text-xl font-semibold">Other Products</h2>
                    <Carousel items={popularProducts} />
                </div>
            </div>
        </div>
    );
}