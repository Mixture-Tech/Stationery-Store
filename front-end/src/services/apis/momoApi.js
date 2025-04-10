import axiosClient from './axiosClient';

const momoApi = {
    createPayment: async (amount, orderInfo) => {
        const response = await axiosClient.post('/momo/create-payment', {
            amount,
            orderInfo,
            redirectUrl: 'http://localhost:5173/thanh-toan/momo/callback'
        });
        return response.data;
    }
};

export default momoApi; 