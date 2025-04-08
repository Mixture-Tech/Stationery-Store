import crypto from 'crypto';
import { MOMO_CONFIG } from '../config/momoConfig';

export class MomoService {
    constructor() {}

    public async createPayment(amount: number, orderId: string, orderInfo: string) {
        const rawSignature = `accessKey=${MOMO_CONFIG.ACCESS_KEY}&amount=${amount}&extraData=&ipnUrl=${MOMO_CONFIG.IPN_URL}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${MOMO_CONFIG.PARTNER_CODE}&redirectUrl=${MOMO_CONFIG.REDIRECT_URL}&requestId=${orderId}&requestType=${MOMO_CONFIG.REQUEST_TYPE}`;
        
        const signature = crypto
            .createHmac('sha256', MOMO_CONFIG.SECRET_KEY)
            .update(rawSignature)
            .digest('hex');

        const requestBody = {
            partnerCode: MOMO_CONFIG.PARTNER_CODE,
            partnerName: "Test",
            storeId: "MomoTestStore",
            requestId: orderId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: MOMO_CONFIG.REDIRECT_URL,
            ipnUrl: MOMO_CONFIG.IPN_URL,
            lang: MOMO_CONFIG.LANG,
            requestType: MOMO_CONFIG.REQUEST_TYPE,
            autoCapture: true,
            extraData: "",
            orderGroupId: "",
            signature: signature
        };

        try {
            const response = await fetch(MOMO_CONFIG.API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
} 