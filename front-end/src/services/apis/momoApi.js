import axiosClient from './axiosClient';

const momoApi = {
    createPayment: async (amount, orderInfo) => {
        console.log('amount', amount);
        console.log('orderInfo', orderInfo);
        const response = await axiosClient.post('/momo/create-payment', {
            amount,
            orderInfo
        });
        return response.data;
    }
};

export default momoApi; 