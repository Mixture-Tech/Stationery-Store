import * as crypto from 'crypto';
import * as moment from 'moment';
import * as querystring from 'qs';

export class VnpayService {
    private tmnCode: string = "MZ85FRWV";
    private secretKey: string = "4D6ANT541OSOALLLXS9UK8FA8JHJGFSP";
    private vnpUrl: string = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    private returnUrl: string = "http://localhost:3000/api/v1//vnpay/vnpay_return"

    constructor() {
        this.tmnCode = "MZ85FRWV",
        this.secretKey = "4D6ANT541OSOALLLXS9UK8FA8JHJGFSP";
        this.vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html", 
        this.returnUrl = "http://localhost:3000/api/v1//vnpay/vnpay_return"
    }

    createPaymentUrl(amount: number, bankCode: string, orderInfo: string, ipAddr: string): string {
        console.log(amount, bankCode, orderInfo, ipAddr);
        const date = new Date();
        const createDate = moment(date).format('YYYYMMDDHHmmss');
        const orderId = moment(date).format('DDHHmmss');
        const locale = 'vn';
        const currCode = 'VND';

        let vnp_Params: any = {
            'vnp_Version': '2.1.0',
            'vnp_Command': 'pay',
            'vnp_TmnCode': this.tmnCode,
            'vnp_Locale': locale,
            'vnp_CurrCode': currCode,
            'vnp_TxnRef': orderId,
            'vnp_OrderInfo': 'Thanh toan cho ma GD:' + orderId,
            'vnp_OrderType': 'VNBANK',
            'vnp_Amount': amount * 100,
            'vnp_ReturnUrl': this.returnUrl,
            'vnp_IpAddr':"127.0.0.1",
            'vnp_CreateDate': createDate,
            'vnp_BankCode': 'NCB'
        };

        vnp_Params = this.sortObject(vnp_Params);

        const signData = querystring.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac('sha512', this.secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;
        console.log(vnp_Params);
        return this.vnpUrl + '?' + querystring.stringify(vnp_Params, { encode: false });
    }

    verifyPayment(vnp_Params: any): boolean {
        const secureHash = vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = this.sortObject(vnp_Params);

        const signData = querystring.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac('sha512', this.secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

        return secureHash === signed;
    }

    private sortObject(obj: Record<string, any>): Record<string, string> {
        const sorted: Record<string, string> = {};
        const keys: string[] = [];
    
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(encodeURIComponent(key));
            }
        }
    
        keys.sort();
    
        for (const key of keys) {
            sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+");
        }
    
        return sorted;
    }
} 