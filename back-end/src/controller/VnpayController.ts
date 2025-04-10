import { Request, Response } from 'express';
import { VnpayService } from '../services/VnpayService';

const vnpayService = new VnpayService();

export const createPaymentUrl = (req: Request, res: Response) => {
    const amount = parseInt(req.query.amount as string);
    const bankCode = req.query.bankCode as string;
    const orderInfo = req.query.orderInfo as string;
    const ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(amount, bankCode, orderInfo, ipAddr);
    try {
        const paymentUrl = vnpayService.createPaymentUrl(amount, bankCode, orderInfo, ipAddr as string);
        res.json({ paymentUrl });
    } catch (error) {
        res.status(500).json({ error: 'Error creating payment URL' });
    }
};

export const handleReturn = (req: Request, res: Response) => {
    const vnp_Params = req.query;

    if (vnpayService.verifyPayment(vnp_Params)) {
        if (vnp_Params['vnp_ResponseCode'] === '00') {
            // Thanh toán thành công
            const returnUrl = `http://localhost:5173/thanh-toan/thanh-cong?success=true&vnp_Amount=${vnp_Params['vnp_Amount']}&vnp_OrderInfo=${vnp_Params['vnp_OrderInfo']}`;
            res.redirect(returnUrl);
        } else {
            // Thanh toán thất bại
            const returnUrl = `http://localhost:5173/thanh-toan/that-bai?success=false&message=Thanh toán thất bại`;
            res.redirect(returnUrl);
        }
    } else {
        const returnUrl = `http://localhost:5173/thanh-toan/that-bai?success=false&message=Sai chữ ký`;
        res.redirect(returnUrl);
    }
};