import ProductCard from "./ProductCard";

const movieData = [
        { src: "https://placehold.co/1200x1000", title: "Sách Lập Trình JavaScript", genre: "200.000 VND", rating: 4.5, subtitle: "500 đã bán" },
        { src: "https://placehold.co/1200x1000", title: "Sách Python Cơ Bản", genre: "250.000 VND", rating: 4.7, subtitle: "750 đã bán" },
        { src: "https://placehold.co/1200x1000", title: "Sách React Nâng Cao", genre: "300.000 VND", rating: 4.9, subtitle: "600 đã bán" },
        { src: "https://placehold.co/1200x1000", title: "Sách Node.js Thực Hành", genre: "280.000 VND", rating: 4.6, subtitle: "420 đã bán" },
        { src: "https://placehold.co/1200x1000", title: "Sách Data Science với Python", genre: "320.000 VND", rating: 4.8, subtitle: "380 đã bán" },
        { src: "https://placehold.co/1200x1000", title: "Sách Kiến Thức SQL", genre: "150.000 VND", rating: 4.3, subtitle: "900 đã bán" },
        { src: "https://placehold.co/1200x1000", title: "Sách Lập Trình JavaScript", genre: "200.000 VND", rating: 4.5, subtitle: "500 đã bán" },
        { src: "https://placehold.co/1200x1000", title: "Sách Python Cơ Bản", genre: "250.000 VND", rating: 4.7, subtitle: "750 đã bán" },
        { src: "https://placehold.co/1200x1000", title: "Sách React Nâng Cao", genre: "300.000 VND", rating: 4.9, subtitle: "600 đã bán" },
        { src: "https://placehold.co/1200x1000", title: "Sách Node.js Thực Hành", genre: "280.000 VND", rating: 4.6, subtitle: "420 đã bán" },
        { src: "https://placehold.co/1200x1000", title: "Sách Data Science với Python", genre: "320.000 VND", rating: 4.8, subtitle: "380 đã bán" },
        { src: "https://placehold.co/1200x1000", title: "Sách Kiến Thức SQL", genre: "150.000 VND", rating: 4.3, subtitle: "900 đã bán" },
        { src: "https://placehold.co/1200x1000", title: "Sách Lập Trình JavaScript", genre: "200.000 VND", rating: 4.5, subtitle: "500 đã bán" },
        { src: "https://placehold.co/1200x1000", title: "Sách Python Cơ Bản", genre: "250.000 VND", rating: 4.7, subtitle: "750 đã bán" },
        { src: "https://placehold.co/1200x1000", title: "Sách React Nâng Cao", genre: "300.000 VND", rating: 4.9, subtitle: "600 đã bán" },
        { src: "https://placehold.co/1200x1000", title: "Sách Node.js Thực Hành", genre: "280.000 VND", rating: 4.6, subtitle: "420 đã bán" },
        { src: "https://placehold.co/1200x1000", title: "Sách Data Science với Python", genre: "320.000 VND", rating: 4.8, subtitle: "380 đã bán" },
        { src: "https://placehold.co/1200x1000", title: "Sách Kiến Thức SQL", genre: "150.000 VND", rating: 4.3, subtitle: "900 đã bán" },
        { src: "https://placehold.co/1200x1000", title: "Sách Kiến Thức SQL", genre: "150.000 VND", rating: 4.3, subtitle: "900 đã bán" },
        { src: "https://placehold.co/1200x1000", title: "Sách Kiến Thức SQL", genre: "150.000 VND", rating: 4.3, subtitle: "900 đã bán" },
];
const SuggestProduct = () => {
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
                {movieData.map((movie, index) => (
                    <div key={index} className="px-2 w-[20%] mb-4">
                        <ProductCard {...movie}/>
                    </div>
                ))}
            </div>
        </div>  
    )
}

export default SuggestProduct;