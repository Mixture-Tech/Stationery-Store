import axios from "axios";
import Cookies from "js-cookie";
import {StorageKeys} from "../key/keys";

const API_BASE_URL = "http://localhost:9001/api-security/v1";
const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers:{
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use(
    (config) =>{
        const token = Cookies.get(StorageKeys.ACCESS_TOKEN);
        if(token){
            config.headers["Authorization"] = "Bearer" + token;
        }
        return config;
    },
    (error) => {
        console.log(error);
        Promise.reject(error);
    },
);


//Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        //Any status code that lie within th range of 2xx casuse this function to trigger
        //Do something with response data
        return response.data || response.data.data
    },
    function (error){
        //Any status code that falls outside the range of 2xx cause this function to trigger
        //Do something with response error
        console.log("Response error: ", error);

        if(error.response){
            const status = error.response.status;
            const data = error.response.data;

            if(status == 401){
                return Promise.reject({
                    status: 401,
                    message: data.message || "Tài khoản hoặc mật khẩu không đúng",
                });
            }else if(status == 400){
                return Promise.reject({
                    status: 400,
                    message: data.message || "Tài khoản chưa được kích hoạt",
                });
            }else if (status == 302){
                return Promise.reject({
                    status: 302,
                    message: data.message || "Server lỗi vui lòng thử lại sau",
                });
            }else{
                //Other cases
                return Promise.reject(error);
            }

        }else{
            console.log("Network error: ", error.message);
            return Promise.reject(error);
        }
    },
);

export default axiosClient;