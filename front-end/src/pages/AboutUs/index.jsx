const AboutUs = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <h2 className="text-4xl font-bold text-primary-600 text-center mb-6">
                Giới thiệu về chúng tôi
            </h2>

            <p className="text-gray-700 text-lg mb-6 text-center">
                Chào mừng bạn đến với <strong>Văn Phòng Phẩm ABC</strong> – nơi cung cấp các sản phẩm văn phòng phẩm chất lượng cao, giá cả hợp lý và dịch vụ tận tâm!
            </p>

            {/* Giới thiệu công ty */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-6">
                <h2 className="text-2xl font-semibold text-primary-500 mb-3">Giới Thiệu</h2>
                <p className="text-gray-600">
                    Được thành lập từ năm 2010, chúng tôi tự hào là một trong những nhà cung cấp văn phòng phẩm uy tín nhất tại Việt Nam. Chúng tôi cam kết mang đến cho khách hàng các sản phẩm chất lượng với giá cả hợp lý nhất.
                </p>
            </div>

            {/* Giá trị cốt lõi */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h2 className="text-2xl font-semibold text-primary-500 mb-3">Giá Trị Cốt Lõi</h2>
                <ul className="pl-6 text-gray-600">
                    <li className="mb-2"><strong>Chất lượng:</strong> Cam kết cung cấp sản phẩm chính hãng, bền bỉ.</li>
                    <li className="mb-2"><strong>Dịch vụ:</strong> Đội ngũ hỗ trợ tận tình, sẵn sàng giúp đỡ.</li>
                    <li><strong>Giá cả:</strong> Hợp lý, cạnh tranh và nhiều ưu đãi cho khách hàng thân thiết.</li>
                </ul>
            </div>

            {/* Sứ mệnh */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-primary-500 mb-3">Sứ Mệnh</h2>
                <p className="text-gray-600">
                    Chúng tôi không chỉ bán sản phẩm, mà còn mong muốn giúp doanh nghiệp và cá nhân có một môi trường làm việc hiệu quả hơn thông qua các giải pháp văn phòng phẩm tiện lợi.
                </p>
            </div>

            {/* Liên hệ */}
            <div className="text-center mt-8">
                <h2 className="text-xl font-semibold text-primary-500 mb-2">Liên Hệ Với Chúng Tôi</h2>
                <p className="text-gray-600">📞 Hotline: <strong>0123 456 789</strong></p>
                <p className="text-gray-600">📧 Email: <strong>support@vanphongphamabc.com</strong></p>
            </div>
        </div>
    );
};

export default AboutUs;
