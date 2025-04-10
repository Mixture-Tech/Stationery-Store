import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function AuthCallback() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get("token");
        const userId = searchParams.get("userId");

        if (token && userId) {
            // Lưu token vào cookie
            document.cookie = `token=${token}; path=/; max-age=86400`; // 1 ngày

            // Lấy thông tin user từ server hoặc tạo object user tạm thời
            const user = { id_user: userId }; // Bạn có thể gọi API để lấy thêm thông tin user nếu cần
            localStorage.setItem("user", JSON.stringify(user));

            // Hiển thị thông báo thành công
            toast.success("Đăng nhập bằng Google thành công!", {
                position: "top-center",
                autoClose: 2000,
            });

            // Chuyển hướng đến trang chủ sau 2 giây
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } else {
            toast.error("Đăng nhập thất bại: Không nhận được thông tin xác thực");
            navigate("/dang-nhap"); // Chuyển hướng về trang đăng nhập nếu lỗi
        }
    }, [navigate, searchParams]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-700">Đang xử lý đăng nhập...</p>
            </div>
        </div>
    );
}