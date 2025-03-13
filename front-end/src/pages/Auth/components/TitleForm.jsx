import PropTypes from 'prop-types';

export default function TitleForm({type}) {
    let title = "";
    let titleExcept = "";
    let btnExcept = "";
    let href = "";
    if (type === "login") {
        title = "Đăng nhập với tài khoản của bạn";
        titleExcept = "Bạn chưa đăng kí?";
        btnExcept = "Đăng kí ngay nào";
        href = "/dang-ki";
    } else if (type === "register") {
        title = "Đăng kí tài khoản";
        titleExcept = "Bạn đã có tài khoản?";
        btnExcept = "Hãy đăng nhập nào";
        href = "/dang-nhap";
    } else if (type === "forgotPassword" || type === "changePassword") {
        title = "Quên mật khẩu";
        titleExcept = "Bạn đã nhớ ra mật khẩu?";
        btnExcept = "Đăng nhập nào";
        href = "/dang-nhap";
    }


    return <div className="flex items-center flex-col">
        <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-white">
            {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-white">
            {titleExcept}{" "}
            <a href={href} className="font-semibold text-indigo-800 hover:text-purple-400 hover:border-purple-400 hover:border-b-[1px]">
                {btnExcept}
            </a>
        </p>
    </div>
}

TitleForm.propTypes = {
    type: PropTypes.string,
}