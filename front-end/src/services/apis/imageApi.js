import axiosClient from "./axiosClient";

const imageApi = {
    getAllImage(){
        const url = "/image/retrieve";
        return axiosClient.get(url);
    }
}

export default imageApi;