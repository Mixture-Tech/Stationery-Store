import * as crypto from 'crypto';
import * as https from 'https';

export class MomoService {
    private accessKey: string;
    private secretKey: string;
    private partnerCode: string;
    private redirectUrl: string;
    private ipnUrl: string;

    constructor() {
        this.accessKey = 'F8BBA842ECF85';
        this.secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
        this.partnerCode = 'MOMO';
        this.redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
        this.ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
    }

    private createSignature(rawSignature: string): string {
        return crypto
            .createHmac('sha256', this.secretKey)
            .update(rawSignature)
            .digest('hex');
    }

    async createPayment(amount: number, orderInfo: string): Promise<any> {
        try {
            console.log('Bắt đầu tạo thanh toán...');
            console.log('Amount:', amount);
            console.log('OrderInfo:', orderInfo);

            const orderId = this.partnerCode + new Date().getTime();
            const requestId = orderId;
            const requestType = "payWithMethod";
            const extraData = '';
            const orderGroupId = '';
            const autoCapture = true;
            const lang = 'vi';

            // Tạo raw signature
            const rawSignature = `accessKey=${this.accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${this.ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${this.partnerCode}&redirectUrl=${this.redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
            console.log('Raw Signature:', rawSignature);

            // Tạo signature
            const signature = this.createSignature(rawSignature);
            console.log('Signature:', signature);

            // Tạo request body
            const requestBody = JSON.stringify({
                partnerCode: this.partnerCode,
                partnerName: "Test",
                storeId: "MomoTestStore",
                requestId: requestId,
                amount: amount.toString(),
                orderId: orderId,
                orderInfo: orderInfo,
                redirectUrl: this.redirectUrl,
                ipnUrl: this.ipnUrl,
                lang: lang,
                requestType: requestType,
                autoCapture: autoCapture,
                extraData: extraData,
                orderGroupId: orderGroupId,
                signature: signature
            });
            console.log('Request Body:', requestBody);

            // Gửi request đến MoMo
            return new Promise((resolve, reject) => {
                const options = {
                    hostname: 'test-payment.momo.vn',
                    port: 443,
                    path: '/v2/gateway/api/create',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(requestBody)
                    }
                };

                console.log('Options:', options);

                const req = https.request(options, (res) => {
                    console.log('Status Code:', res.statusCode);
                    console.log('Headers:', res.headers);

                    let data = '';
                    res.on('data', (chunk) => {
                        data += chunk;
                    });
                    res.on('end', () => {
                        console.log('Response Data:', data);
                        try {
                            const response = JSON.parse(data);
                            resolve(response);
                        } catch (error) {
                            console.error('Parse Response Error:', error);
                            reject(error);
                        }
                    });
                });

                req.on('error', (error) => {
                    console.error('Request Error:', error);
                    reject(error);
                });

                console.log('Sending request...');
                req.write(requestBody);
                req.end();
            });
        } catch (error) {
            console.error('Create Payment Error:', error);
            throw error;
        }
    }
} 