import React, {useState} from "react";
import FormInput from "./FormInput";
import { CustomLoadingButton } from "../../../components/Forms/Button/customColor.jsx";
import ShowError from "../components/ShowError.jsx";
import Oauth2 from "./Oauth2.jsx";
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';
import {Checkbox, FormControlLabel} from "@mui/material";

const AuthForm = ({ handleSubmit, email, setEmail, password, setPassword, rePassword, setRePassword, errors, errorString, loading, remember, setRemember, showRePassword, type, recaptchaToken=undefined, setRecaptchaToken=undefined }) => {
    const handleVerify = (token) => {
        setRecaptchaToken(token);
    };

    let btnText = "";

    if (type === "login") {
        btnText = "Đăng Nhập";
    } else if (type === "register") {
        btnText = "Đăng Kí";
    } else if (type === "forgotPassword") {
        btnText = "Gửi Đi";
    } else if (type === "changePassword") {
        btnText = "Đổi mật khẩu";
    } else {
        btnText = "Gửi đi";
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-1">
            {recaptchaToken !== undefined && (
                <GoogleReCaptcha onVerify={handleVerify} />
            )}

            {email !== undefined && (
                <FormInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                />
            )}
            {password !== undefined && (
                <FormInput
                    label="Mật khẩu"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                />
            )}
            {showRePassword && rePassword !== undefined && password !== undefined &&(
                <FormInput
                    label="Xác nhận lại mật khẩu"
                    type="password"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    error={!!errors.password}
                />
            )}
            {remember !== undefined && (
                <div className="flex items-center justify-between text-white">
                    <FormControlLabel
                        control={<Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} />}
                        label="Ghi nhớ tôi"
                    />
                    <a href="/quan-mat-khau" className="font-semibold hover:text-purple-600">
                        Quên mật khẩu?
                    </a>
                </div>
            )}
            <ShowError errorString={errorString} />
            <CustomLoadingButton variant="contained" type="submit" className="w-full border-[10px]" loading={loading}>
                {btnText}
            </CustomLoadingButton>
        </form>
    );
};

export default AuthForm;