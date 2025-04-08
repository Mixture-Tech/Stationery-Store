import {useEffect, useState} from "react";
import {authenticate} from "../../../services/apis/auth.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {validateEmail, validatePassword} from "../../../services/validate/validate.js";
import Oauth2 from "../components/Oauth2.jsx"
import TitleForm from "../Components/TitleForm.jsx";
import AuthForm from "../components/AuthForm.jsx";
import PropTypes from 'prop-types';

export default function Login(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [errorString, setErrorString] = useState("");
    const [isNavigating, setIsNavigating] = useState(false);

    const title = props.title;
    useEffect(() => {
        document.title = title ? `${title}` : "Trang không tồn tại";
    }, [title]);

    async function handleSubmit(e) {
        e.preventDefault();

        const validationErrors = {};
        validationErrors.email = validateEmail(email);
        if (validationErrors.email === "") delete validationErrors.email;
        validationErrors.password = validatePassword(password);
        if (validationErrors.password === "") delete validationErrors.password;
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length !== 0) {
            setErrorString(Object.entries(validationErrors)
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n'));
        } else {
            try {
                setLoading(true);
                await authenticate({ email, password });
                toast.success("Đăng nhập thành công!", {
                    position: "top-center",
                    autoClose: 2000
                });
                setIsNavigating(true);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } catch (err) {
                toast.error(err.message || "Đăng nhập thất bại");
                setErrorString(err.message || "Đăng nhập thất bại");
                console.error("Error fetching server: ", err);
            } finally {
                setLoading(false);
            }
        }
    }

    return <>
        {isNavigating && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-gray-700">Đang xác thực...</p>
                </div>
            </div>
        )}
        <div style={{ backgroundImage: "linear-gradient(-45deg, #3674B5, #578FCA, #A1E3F9, #BFDBFE)" }} className="animate-gradient-move h-screen overflow-hidden flex items-center justify-center my-2 mx-5 md:mx-0 md:my-0">
            <div className="absolute start-36 top-12 animate-zoomIn">
                <img src="https://placehold.co/100x100" alt="Logo" className="w-20"/>
            </div>

            {/* container */}
            <div className="w-[100%] flex flex-col md:flex-row justify-center items-center space-y-10 md:space-y-0 md:space-x-16 p-6">
                {/* part image */}
                <div className="md:w-1/3 w-1/3">
                    <img src="https://placehold.co/1000x1000" alt="Login image" className="w-[85%] h-auto animate-fade-in-left" />
                </div>

                <div className="border-2 rounded-lg bg-slate-500 shadow-md ml-2 w-[35%] p-6 animate-zoomIn">
                    {/* form input */}
                    <TitleForm type="login"/>
                    <div className="mt-2 animate-fade-in-right">
                        <AuthForm
                            handleSubmit={handleSubmit}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            errors={errors}
                            errorString={errorString}
                            loading={loading}
                            remember={remember}
                            setRemember={setRemember}
                            showRePassword={false}
                            type={"login"}
                        />
                        <Oauth2 />
                    </div>     
                </div>
            </div>
        </div>
    </>;
}

Login.propTypes = {
    title: PropTypes.string.isRequired,
}