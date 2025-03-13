import { data } from "autoprefixer";
import axiosClient from "./axiosClient";

const productApi = {
    getAllProduct(id){
        const url = "/product/retrieve";
        return axiosClient.get(url);
    },

    getProductByID(){
        const url = "/product/retrieveID";
        return axiosClient.get(url, {id});
    },

    createProduct(data){
        const url = "/product/create";
        return axiosClient.post(url, data);
    },

    updateProduct(data){
        const url = "/product/update";
        return axiosClient.put(url, data);
    },

    deleteProduct(id){
        const url = "/product/delete/${id}";
        return axiosClient.delete(url, {id});
    },

    findProductByTitle(params){
        const url = "/product/title";
        return axiosClient.get(ur, {params});
    }
}
export default productApi;