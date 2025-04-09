import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="pt-14 bg-gradient-to-b from-white to-primary-200 h-screen flex flex-col items-center justify-center">
            <img src="/src/assets/img/401.jpg" alt="401 Error"
            className="w-1/3 mb-8" />

            <div className="flex flex-col items-center justify-center gap-4 mb-8">
                <div className="flex flex-col items-center justify-center">
                    <Link to="/" className="bg-white text-indigo-500 px-6 py-2 rounded shadow hover:bg-gray-100">
                        Về trang chủ 
                    </Link>

                </div>
                Or
                <div className="flex flex-col items-center justify-center">
                    <Link to="/dang-nhap" className="bg-white text-indigo-500 px-6 py-2 rounded shadow hover:bg-gray-100">
                        Đăng nhập
                    </Link>

                </div>
            </div>
        </div>
        
    );
};

export default NotFoundPage;