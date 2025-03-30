import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const RoomItem = () => {
    return(
        <div>
            <div className="min-w-full flex flex-row gap-4">
                <video id="movie-video" className="w-3/4 bg-black mb-8" controls>
                    <source src="path_to_video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="w-1/4">
                    <div>
                        <section className="rounded ">
                            <div className="rounded-tl rounded-tr border-b border-solid bg-slate-600 px-4 py-2 text-slate-200 font-nunito font-bold">
                                <h2 className="text-lg font-semibold">Người Đang Xem</h2>
                            </div>
                            <ul>
                                <li className="border-t border-solid border-gray-200 first:border-t-0">
                                    <div className="CardJobList block rounded bg-gradient-to-r from-slate-500 to-blue-700 p-4">
                                        <div className="flex items-start gap-2">
                                            <div className="w-100">
                                                <a className="inline-block" target="_blank" href="">
                                                    <img
                                                        src="https://placehold.co/1200x200"
                                                        style={{ objectFit: "cover" }}
                                                        alt=""
                                                        loading="lazy"
                                                        width="88"
                                                        height="66"
                                                        decoding="async"
                                                        className="h-20 w-20 max-w-full rounded-full bg-white"
                                                    />
                                                </a>
                                            </div>
                                            <div className="flex-1 ">
                                                <h3 className="line-clamp-1 text-sm font-bold md:text-lg">
                                                    <a className="transition hover:text-primary" target="_blank" href="">
                                                        Tên Người Dùng
                                                    </a>
                                                </h3>
                                                <div className="line-clamp-1">
                                                    <a
                                                        target="_blank"
                                                        className="text-sm text-gray-200 transition-all hover:text-primary md:text-base"
                                                        href=""
                                                    >
                                                        Online: 48h
                                                    </a>
                                                </div>
                                                <div className="mt-2 flex items-end">
                                                    <div className="line-clamp-1">
                                                        <a className="mr-2 inline-block" href="">
                                                            <span className="whitespace-nowrap text-md font-normal transition-all inline-flex items-center justify-center border-solid hover:border-blue-dark h-[1.625rem] text-sm bg-red-500 text-black px-4 hover:scale-110 rounded">
                                                                Kick
                                                            </span>
                                                        </a>
                                                        <a className="mr-2 inline-block" href="">
                                                            <span className="whitespace-nowrap rounded border text-md font-normal transition-all inline-flex items-center justify-center border-solid hover:border-blue-dark h-[1.625rem] px-2 text-xs md:h-7 md:px-2 md:text-sm bg-blue-100 text-blue-500">
                                                                JavaScript
                                                            </span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="border-t border-solid border-gray-200 first:border-t-0">
                                    <div className="CardJobList block rounded border border-solid border-white bg-white p-4"></div>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
            {/* Danh Sách Tập */}
            <div>
                <div className="p-2">
                    <p className="text-lg font-medium text-white">
                        <FontAwesomeIcon className="mr-2" icon={faFilm} flip="horizontal" style={{ color: "#74C0FC" }} />
                        Thuyết Minh: 
                    </p>
                    <div className="grid grid-cols-10 gap-2 mt-3">
                        {Array.from({ length: 20 }).map((_, index) => (
                            <a
                                href="!#"
                                key={index}
                                className="bg-gradient-to-r from-slate-500 to-blue-700 p-2 rounded-md text-white shadow-md hover:shadow-lg transition-all duration-300 text-center hover:text-black hover:bg-stone-800"
                            >
                                <span className="text-sm font-medium">
                                    Tập {index + 1}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
                <div className="p-2">

                    <p className="text-lg font-medium text-white">
                        <FontAwesomeIcon className="mr-2" icon={faFilm} flip="horizontal" style={{ color: "#74C0FC" }} />
                        VietSub: 
                    </p>
                    <div className="grid grid-cols-10 gap-2 mt-3">
                        {Array.from({ length: 20 }).map((_, index) => (
                            <a
                                href="!#"
                                key={index}
                                className="bg-gradient-to-r from-slate-500 to-blue-700 p-2 rounded-md text-white shadow-md hover:shadow-lg transition-all duration-300 text-center hover:text-black hover:bg-stone-800"
                            >
                                <span className="text-sm font-medium">
                                    Tập {index + 1}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomItem;