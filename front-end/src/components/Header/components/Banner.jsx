import { useEffect, useState } from "react";
import { productApi } from "../../../services/apis/productApi";

export default function Banner() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);

    // Lấy danh sách sản phẩm và chọn ngẫu nhiên 5 sản phẩm
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productApi.getAllProducts();
                // Chọn ngẫu nhiên 5 sản phẩm
                console.log(response);
                const randomProducts = response
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 5);
                setProducts(randomProducts);
                if (randomProducts.length > 0) {
                    setCurrentProduct(randomProducts[0]);
                }
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm:", error);
            }
        };

        fetchProducts();
    }, []);

    // Tự động chuyển slide sau mỗi 3 giây
    useEffect(() => {
        if (products.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [products.length]);

    // Cập nhật sản phẩm hiện tại khi index thay đổi
    useEffect(() => {
        if (products.length > 0) {
            setCurrentProduct(products[currentIndex]);
        }
    }, [currentIndex, products]);

    if (!currentProduct) {
        return null;
    }

    return (
        <div
            className="relative bg-cover bg-center mt-14 transition-all duration-500 ease-in-out font-nunito"
            style={{ 
                backgroundImage: `url(${currentProduct.image})`,
                height: '400px'
            }}
        >
            {/* Lớp overlay */}
            <div className="absolute inset-0 bg-black opacity-60 backdrop-blur-sm transition-opacity duration-500 ease-in-out"></div>

            {/* Nội dung */}
            <div className="relative z-10 py-12 md:py-24">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-row items-center font-nunito font-bold">
                        <div className="w-full mt-8 md:mt-0 text-center">
                            <h2 className="font-bold text-white text-[45px] mb-2">
                                {currentProduct.name}
                            </h2>
                            <p className="text-white text-xl mb-4">
                                {currentProduct.description}
                            </p>
                            <p className="text-white text-2xl">
                                {new Intl.NumberFormat('vi-VN', { 
                                    style: 'currency', 
                                    currency: 'VND' 
                                }).format(currentProduct.price)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
