import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
// import HoangTuLai from "../../../assets/img/Banner/HoangTuLai.png";

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
            className="relative bg-contain bg-center mt-10 transition-all duration-500 ease-in-out font-nunito"
            style={{ backgroundImage: movieData.background }}
        >
            {/* Lớp overlay */}
            <div className="absolute inset-0 bg-black opacity-60 backdrop-blur-sm transition-opacity duration-500 ease-in-out"></div>

            {/* Nội dung */}
            <div className="relative z-10 py-12 md:py-24">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-col-reverse items-center md:flex-row md:items-start md:space-x-8 font-nunito font-bold">
                        <div className="w-full mt-8 md:mt-0 md:w-1/2 text-center md:text-left">
                            <h2 className="font-bold text-title-600 text-xl md:text-2xl mb-2">
                                {movieData.title}
                            </h2>
                            <h1 className="mb-4 text-title-500 font-bold leading-tight  md:text-4xl lg:text-5xl">
                                {movieData.subtitle}
                            </h1>
                            <div className="flex flex-wrap justify-center md:justify-start items-center mb-4 space-x-2 space-y-2 md:space-y-0">
                                <span className="bg-wine-red-500 text-white text-xs font-bold  px-3 py-1 rounded">
                                    PG 18
                                </span>
                                <span className="bg-wine-red-500 text-white text-xs font-semibold px-3 py-1 rounded">
                                    HD
                                </span>
                                <span className="text-white font-bold text-sm">
                                    {movieData.genres}
                                </span>
                                <span className="flex items-center text-white text-sm">
                                    <svg
                                        className="w-4 h-4 mr-1 text-yellow-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    {movieData.year}
                                </span>
                                <span className="flex items-center text-sm text-white">
                                    <svg
                                        className="w-4 h-4 mr-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    {movieData.duration}
                                </span>
                            </div>
                            <div className="mt-6">
                                <button
                                    className="before:ease rounded-lg relative h-12 w-full md:w-48 overflow-hidden  bg-button-500 text-slate-300 shadow-2xl 
                  transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20
                  before:rotate-45 before:bg-button-700 before:duration-300 hover:text-white hover:font-bold hover:shadow-blue-500 hover:before:h-64
                  hover:before:-translate-y-32"
                                >
                                    <span className="relative z-10 flex items-center justify-center">
                                        <FontAwesomeIcon
                                            icon={faPlay}
                                            className="mr-2"
                                        />
                                        Watch Now
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex justify-center">
                            <img
                                className="w-full max-w-xs md:max-w-sm lg:max-w-md rounded-xl shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105"
                                alt="Movie Poster"
                                src={movieData.image}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}