import crypto from 'crypto';
import axios from 'axios';

export class MomoService {
    private static instance: MomoService;
    private partnerCode = "MOMO";
    private accessKey = "F8BBA842ECF85";
    private secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    private redirectUrl = "http://localhost:3000/payment/success";
    private ipnUrl = "http://localhost:3000/payment/ipn";
    private requestType = "captureWallet";
    private extraData = "";

    private constructor() {}

    public static getInstance(): MomoService {
        if (!MomoService.instance) {
            MomoService.instance = new MomoService();
        }
        return MomoService.instance;
    }

    public async createPaymentRequest(orderId: string, amount: number, orderInfo: string): Promise<string> {
        try {
            const rawSignature = `accessKey=${this.accessKey}&amount=${amount}&extraData=${this.extraData}&ipnUrl=${this.ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${this.partnerCode}&redirectUrl=${this.redirectUrl}&requestId=${orderId}&requestType=${this.requestType}`;
            const signature = crypto.createHmac('sha256', this.secretKey).update(rawSignature).digest('hex');

            const requestBody = {
                partnerCode: this.partnerCode,
                partnerName: "Test",
                storeId: "MomoTestStore",
                requestId: orderId,
                amount: amount,
                orderId: orderId,
                orderInfo: orderInfo,
                redirectUrl: this.redirectUrl,
                ipnUrl: this.ipnUrl,
                lang: "vi",
                requestType: this.requestType,
                extraData: this.extraData,
                signature: signature
            };

            const response = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody);
            return response.data.payUrl;
        } catch (error) {
            console.error('Error creating MoMo payment:', error);
            throw error;
        }
    }

    public verifyPayment(partnerCode: string, orderId: string, requestId: string, amount: number, orderInfo: string, orderType: string, transId: string, resultCode: number, message: string, payType: string, responseTime: number, extraData: string, signature: string): boolean {
        const rawSignature = `accessKey=${this.accessKey}&amount=${amount}&extraData=${extraData}&message=${message}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&partnerCode=${partnerCode}&payType=${payType}&requestId=${requestId}&responseTime=${responseTime}&resultCode=${resultCode}&transId=${transId}`;
        const expectedSignature = crypto.createHmac('sha256', this.secretKey).update(rawSignature).digest('hex');
        return expectedSignature === signature;
    }
} 