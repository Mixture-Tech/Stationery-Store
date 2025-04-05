import Logo from "../../assets/img/Logo/Logo.svg";

export default function Footer() {
    return (
        <footer className="px-4 mx-auto max-w-container pb-4 sm:px-6 lg:px-20 bg-blue-900 flex flex-col justify-center items-center">
            <div className="grid grid-cols-5 mt-3 gap-6 w-11/12 border-black rounded-t-xl p-4 font-nunito text-[14px] text-slate-300">
                <div className="col-span-2">
                    <img src={Logo} alt="Logo" className="w-10 rounded-full object-cover" />
                    <div className="whitespace-pre-line">
                        <span className="">Văn Phòng Phẩm Mixture</span> - Cửa hàng trực tuyến cung cấp các sản phẩm văn phòng phẩm chất lượng cao, từ bút, giấy, sổ tay đến các thiết bị văn phòng, luôn sẵn sàng phục vụ nhu cầu của bạn.
                    </div>
                </div>
                <div className="col-span-1">
                    <h5 className="">SẢN PHẨM</h5>
                    <ul className="list-none">
                        <li><a className="hover:text-slate-400" href="">Bút và Dụng Cụ Viết</a></li>
                        <li><a className="hover:text-slate-400" href="">Giấy và Sổ Tay</a></li>
                        <li><a className="hover:text-slate-400" href="">Thiết Bị Văn Phòng</a></li>
                        <li><a className="hover:text-slate-400" href="">Phụ Kiện Văn Phòng</a></li>
                    </ul>
                </div>
                <div className="col-span-1">
                    <h5 className="">THỂ LOẠI</h5>
                    <ul className="list-none">
                        <li><a className="hover:text-slate-400" href="">Sản Phẩm Giảm Giá</a></li>
                        <li><a className="hover:text-slate-400" href="">Mới Nhất</a></li>
                        <li><a className="hover:text-slate-400" href="">Khuyến Mãi</a></li>
                    </ul>
                </div>
                <div className="col-span-1">
                    <h5 className="">DỊCH VỤ</h5>
                    <ul className="list-none">
                        <li><a className="hover:text-slate-400" href="">Hỗ Trợ Khách Hàng</a></li>
                        <li><a className="hover:text-slate-400" href="">Về Chúng Tôi</a></li>
                        <li><a className="hover:text-slate-400" href="">Điều Khoản Dịch Vụ</a></li>
                        <li><a className="hover:text-slate-400" href="">Chính Sách Bảo Hành</a></li>
                    </ul>
                </div>
            </div>
            <div className="w-11/12 rounded-b-xl flex justify-center border-t-2 border-t-Soft-Purple-400 border-black bg-Gray-Black-500 p-4">
                <p className="text-slate-300">2024 Văn Phòng Phẩm Mixture</p>
            </div>
        </footer>
    );
}
