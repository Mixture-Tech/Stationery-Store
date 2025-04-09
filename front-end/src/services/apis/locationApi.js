import axiosClient from './axiosClient';

export const getDistricts = async () => {
    try {
        const response = await axiosClient.get("/districts/get-all");
        return response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getProvinces = async () => {
    try {
        const response = await axiosClient.get("/provinces/get-all");
        return response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}; 