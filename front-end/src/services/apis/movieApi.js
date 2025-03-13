import axiosClient from "./axiosClient";

const movieApis = {
    getMovieByProductDetailID(id){
        const url = "/movie/{id}";
        return axiosClient.get(url, {id});
    }
}