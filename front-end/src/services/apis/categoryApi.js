import axiosClient from "./axiosClient";
import axios from "./axiosClient";

const categoryApi = {
    getAllCategory(){
        const url = "/category/retrieve";
        return axiosClient.get(url);
    }
}

export default categoryApi;