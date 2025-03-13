import React, { useState, useMemo, useCallback, useRef } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const TextFieldColor = styled(TextField)({
    "& label": {
        transform: "translate(14px, 10px) scale(1.2)", // Điều chỉnh vị trí mặc định
        fontSize: "12px",
        lineHeight: "20px",
        backgroundColor: "transparent",
        color: "white",
    },
    "& label.Mui-focused": {
        color: "#00a9ff",
        transform: "translate(14px, -6px) scale(0.75)", // Vị trí khi focus
    },
    "& .MuiInputLabel-shrink": {
        transform: "translate(14px, -6px) scale(0.75)",
    },
    "& .MuiOutlinedInput-root": {
        borderRadius: '10px',
        "& fieldset": {
            borderColor: "transparent", // Bỏ viền nếu không cần
        },
        "&:hover fieldset": {
            borderColor: "transparent",
        },
        "&.Mui-focused fieldset": {
            borderColor: "transparent",
        },
        height: "35px",
        padding: "0 10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Shadow mặc định
        transition: "box-shadow 0.3s ease", // Hiệu ứng mượt
        "&:hover": {
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)", // Shadow khi hover
        },
        "&.Mui-focused": {
            boxShadow: "0px 4px 10px rgba(0, 169, 255, 0.5)", // Shadow khi focus
        },
    },
    "& .MuiInputBase-input": {
        height: "1.2em",
        padding: "8px",
        color: "white", 
        fontSize: "12px"
    },
    "& .MuiFormLabel-root": {
        top: "-3px",
    },
});




// eslint-disable-next-line react/prop-types
const PasswordVisibilityToggle = ({ showPassword, onClick }) => (
    <InputAdornment position="end">
        <IconButton aria-label="toggle password visibility" onClick={onClick} edge="end">
            {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
    </InputAdornment>
);

function PasswordField({
                           // eslint-disable-next-line react/prop-types
                           label,
                           name = "password",
                           id = "password",
                           autoComplete = "current-password",
                           value,
                           onChange, // Thêm props onChange
                           ...props
                       }) {
    const [showPassword, setShowPassword] = useState(false);
    const [hasValuePassword, setHasValuePassword] = useState(false);
    const passwordRef = useRef(null);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleChange = useCallback((e) => {
        setHasValuePassword(passwordRef.current.value.length > 0);
        if (onChange) {
            onChange(e);
        }
    }, [onChange]);

    const endAdornment = useMemo(() => {
        if (!hasValuePassword) return null;
        return <PasswordVisibilityToggle showPassword={showPassword} onClick={handleClickShowPassword} />;
    }, [hasValuePassword, showPassword]);

    return (
        <div className="mt-2">
            <TextFieldColor
                {...props}
                margin="normal"
                fullWidth
                name={name}
                label={label}
                type={showPassword ? "text" : "password"}
                id={id}
                onChange={handleChange}
                autoComplete={autoComplete}
                value={value}
                InputProps={{
                    endAdornment: endAdornment,
                }}
                inputRef={passwordRef}
            />
        </div>
    );
}

export default PasswordField;