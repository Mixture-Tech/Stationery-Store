import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function MailForm() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white">
            {/* Form Container */}
            <div className="bg-[#235264] p-8 rounded-xl shadow-lg w-full max-w-md relative">
                {/* Logo (Positioned inside the Form Container) */}
                <div className="absolute top-4 left-4">
                    <img src="./src/assets/img/Logo/Logo.png" alt="Logo" className="h-12 w-12 rounded-full border-1 border-white overflow-hidden" />
                </div>

                {/* Content Wrapper with Padding */}
                <div className="mt-16">
                    {/* Title */}
                    <h2 className="text-2xl font-semibold mb-6 text-center">Your OTP Code</h2>
                    <p className="text-gray-300 text-center mb-6">
                        We&apos;ve sent a one-time password to your email. Please use the following code to verify your identity:
                    </p>

                    {/* OTP Display */}
                    <div className="bg-Bright-Pink-500 text-white text-3xl font-bold p-4 rounded-lg text-center">
                        123456 {/* Mã OTP mẫu */}
                    </div>

                    {/* Email Icon */}
                    <div className="mt-6 text-center">
                        <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 text-2xl" />
                    </div>

                    {/* Note */}
                    <p className="text-sm text-gray-500 text-center mt-4">
                        If you didn&apos;t request this email, please ignore it.
                    </p>
                </div>
            </div>
        </div>
    );
}
