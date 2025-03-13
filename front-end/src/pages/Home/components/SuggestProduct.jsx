import { useState } from "react";
import ProductCard from "./ProductCard";
import { movieData } from "./PesudoData";

const SuggestProduct = () => {
    const [visibleCount, setVisibleCount] = useState(10);
    const [isLoading, setIsLoading] = useState(false);

    const handleShowMore = () => {
        setIsLoading(true);
        setTimeout(() => {
            setVisibleCount((prev) => prev + 15);
            setIsLoading(false);
        }, 1000); 
    };

    return (
        <div className="w-[60%] shadow-2xl">
            <div className="relative flex items-center justify-center bg-blue-400 text-white py-3 rounded-t-lg shadow-lg">
                <span className="text-lg font-semibold">✨ Gợi ý cho bạn ✨</span>
                <div className="absolute left-4">
                    <span className="text-white text-2xl">📖</span> 
                </div>
                <div className="absolute right-4">
                    <span className="text-white text-2xl">👍</span> 
                </div>
            </div>
            <div className="flex flex-wrap p-4">
                {movieData.slice(0, visibleCount).map((movie, index) => (
                    <div key={index} className="px-2 w-[20%] mb-6">
                        <ProductCard {...movie}/>
                    </div>
                ))}
            </div>
            <div className="mx-auto mt-4 mb-4 text-center w-[20%]">
                <button
                    className="inline-flex items-center justify-center border border-solid text-primary-600 text-md w-full h-9
                       bg-indigo-500 px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-indigo-100 rounded-full hover:shadow-2xl hover:bg-indigo-600 lg:text-base lg:px-6 lg:gap-3 transition-all"
                    type="button"
                    onClick={handleShowMore}
                    disabled={isLoading} // Vô hiệu hóa khi đang tải
                >
                    {isLoading ? (
                        <svg className="w-5 h-5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"></path>
                        </svg>
                    ) : (
                        "Show more"
                    )}
                </button>
            </div>
        </div>  
    )
}

export default SuggestProduct;