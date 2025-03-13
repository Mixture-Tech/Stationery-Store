import { useEffect, useState } from "react";

export default function Banner() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [movieData, setMovieData] = useState({
        title: "AVG Film",
        subtitle: "A world of cinema at your fingertips",
        genres: "Romance, Drama",
        year: "2012",
        duration: "128 min",
        image: "path/to/initial-image.jpg",
        background: "url(path/to/initial-background.jpg)",
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const movies = [
        {
            title: "AVG Film",
            subtitle: "A world of cinema at your fingertips",
            genres: "Romance, Drama",
            year: "2012",
            duration: "128 min",
            image: "https://i.pinimg.com/736x/a3/58/97/a35897bb64fb9ed9c92d6c99a911bbb5.jpg",
            background:
                "url(https://i.pinimg.com/564x/ad/f6/9a/adf69ab3864604dbbcc73127cc20adf2.jpg)",
        },
        {
            title: "Another Movie",
            subtitle: "Experience the adventure!",
            genres: "Action, Adventure",
            year: "2020",
            duration: "150 min",
            image: "https://i.pinimg.com/564x/42/3f/ec/423feceb759bd0769ea675a9b4e886a0.jpg",
            background:
                "url(https://i.pinimg.com/564x/0f/36/b6/0f36b6d0c2a98ec79e20997469cd1f49.jpg)",
        },
        {
            title: "Another Movie",
            subtitle: "Experience the adventure!",
            genres: "Action, Adventure",
            year: "2020",
            duration: "150 min",
            image: "https://i.pinimg.com/564x/40/53/6b/40536b76173afcd3c9b0e37a8c769a39.jpg",
            background:
                "url(https://i.pinimg.com/564x/13/49/cb/1349cbe4112b3458c94888f8ba62ce92.jpg)",
        },
        {
            title: "Another Movie",
            subtitle: "Experience the adventure!",
            genres: "Action, Adventure",
            year: "2020",
            duration: "150 min",
            image: "https://i.pinimg.com/564x/40/53/6b/40536b76173afcd3c9b0e37a8c769a39.jpg",
            background:
                "url(https://i.pinimg.com/736x/6a/c9/37/6ac9374d9cda6e7b0f3571684912dd5c.jpg)",
        },
        {
            title: "Another Movie",
            subtitle: "Experience the adventure!",
            genres: "Action, Adventure",
            year: "2020",
            duration: "150 min",
            image: "https://i.pinimg.com/564x/ee/e4/ba/eee4ba199f56b953d1ce4e070f6d13be.jpg",
            background:
                "url(https://i.pinimg.com/564x/6b/a1/a2/6ba1a23c40a9a1ef4f92fe9a1d33287d.jpg)",
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
        }, 3000); // Thay đổi sau mỗi 3 giây

        return () => clearInterval(interval); // Dọn dẹp khi component unmount
    }, [movies.length]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setMovieData(movies[currentIndex]);
        }, 500); // Đảm bảo trạng thái được cập nhật một cách mượt mà hơn

        return () => clearTimeout(timeout);
    }, [currentIndex, movies]);

    return (
        <div
            className="relative bg-cover bg-center mt-14 transition-all duration-500 ease-in-out font-nunito"
            style={{ backgroundImage: movieData.background }}
        >
            {/* Lớp overlay */}
            <div className="absolute inset-0 bg-black opacity-60 backdrop-blur-sm transition-opacity duration-500 ease-in-out"></div>

            {/* Nội dung */}
            <div className="relative z-10 py-12 md:py-24">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-row items-center font-nunito font-bold">
                        <div className="w-1/2 mt-8 md:mt-0 md:w-1/2 text-center">
                            <h2 className="font-bold text-blue-600 text-[45px] mb-2">
                                {movieData.title}
                            </h2>
                            <h1 className="mb-4 text-blue-600 font-bold leading-tight text-[50px]">
                                {movieData.subtitle}
                            </h1>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
