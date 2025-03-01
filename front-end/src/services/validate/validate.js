export const validateEmail = (email) =>{
    if(email.trim().length == 0){
        return "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        return "Email is invalid";
    } else {
        return "";
    }
};

export const validatePassword = (password) => {
    if(!password.trim()){
        return "password is required";
    }else if(password.length < 8){
        return "Password must be at least 8 characters long";
    }else{
        return "";
    }
};

export const validateRePassword = (password, repassword) => {
    if(password != repassword){
        return "Password and Repassword do not match";
    }
    return "";
}

export const validateFullName = (fullName) => {
    if(!fullName.trim()){
        return "full name is required";
    } else if (/\d/.test(fullName)) {
        return "Full name should not contain numbers";
    } else {
        return "";
    }
}

export const validateFile = (file) => {
    if (!file) {
        return "File is required";
    } else if (file.size > 10 * 1024 * 1024) {
        return "File size must be smaller than 10MB";
    } else {
        return "";
    }
}

export const validateFileAllowNull = (file) => {
    if (!file) {
        return "";
    } else if (file.size > 10 * 1024 * 1024) {
        return "File size must be smaller than 10MB";
    } else {
        return "";
    }
}