import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyOTP } from "../../../services/apis/auth";

export default function VerifyEmail() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Vui lòng nhập email");
            return;
        }
        if (!otp) {
            toast.error("Vui lòng nhập mã OTP");
            return;
        }

        try {
            setLoading(true);
            const response = await verifyOTP({ email, otp });
            if (response) {
                setIsVerified(true);
                toast.success("Xác thực email thành công!", {
                    position: "top-center",
                    autoClose: 3000,
                });
                setTimeout(() => {
                    navigate("/dang-nhap");
                }, 5000);
            }
        } catch (error) {
            toast.error(error.message || "Xác thực thất bại");
        } finally {
            setLoading(false);
        }
    };

    if (isVerified) {
        return (
            <div style={{ backgroundImage: "linear-gradient(-45deg, #3674B5, #578FCA, #A1E3F9, #BFDBFE)" }} 
                 className="animate-gradient-move h-screen overflow-hidden flex items-center justify-center my-2 mx-5 md:mx-0 md:my-0">
                <div className="border-2 rounded-lg bg-slate-500 shadow-md w-[35%] p-6 animate-zoomIn">
                    <div className="text-center">
                        <div className="mb-4">
                            <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Xác thực Thành công!</h2>
                        <p className="text-white mb-6">Email của bạn đã được xác thực thành công.</p>
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                        <p className="text-white">Đang chuyển hướng đến trang đăng nhập...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ backgroundImage: "linear-gradient(-45deg, #3674B5, #578FCA, #A1E3F9, #BFDBFE)" }} 
             className="animate-gradient-move h-screen overflow-hidden flex items-center justify-center my-2 mx-5 md:mx-0 md:my-0">
            <div className="border-2 rounded-lg bg-slate-500 shadow-md w-[35%] p-6 animate-zoomIn">
                <h2 className="text-2xl font-bold text-center text-white mb-6">Xác thực Email</h2>
                
                <div className="text-center text-white mb-6">
                    <p>Vui lòng nhập email và mã OTP đã được gửi đến email của bạn</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Nhập mã OTP"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            maxLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
                            loading 
                                ? "bg-gray-400 cursor-not-allowed" 
                                : "bg-blue-600 hover:bg-blue-700"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Đang xử lý...
                            </div>
                        ) : (
                            "Xác nhận"
                        )}
                    </button>
                </form>

                <div className="mt-4 text-center text-white">
                    <p>Không nhận được mã OTP?</p>
                    <button 
                        onClick={() => navigate("/dang-ki")}
                        className="text-blue-200 hover:text-blue-100 underline mt-2"
                    >
                        Đăng ký lại
                    </button>
                </div>
            </div>
        </div>
    );
} 