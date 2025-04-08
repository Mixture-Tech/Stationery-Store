import axiosClient from './axiosClient';

const paymentApi = {
    createMomoPayment: (data) => {
        const url = '/create';
        return axiosClient.post(url, data);
    },

    handleMomoCallback: (data) => {
        const url = '/callback';
        return axiosClient.post(url, data);
    }
};

export default paymentApi; 