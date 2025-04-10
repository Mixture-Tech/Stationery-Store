import axiosClient from './axiosClient';

const vnpayApi = {
    createPaymentUrl: async (amount, bankCode, orderInfo) => {
        console.log(amount, bankCode, orderInfo);
        try {
            const response = await axiosClient.get('/vnpay/create_payment_url', {
                params: {
                    amount,
                    bankCode,
                    orderInfo
                }
            });
            return response.paymentUrl;
        } catch (error) {
            console.error('Error creating payment URL:', error);
            throw error;
        }
    }
};

export default vnpayApi;