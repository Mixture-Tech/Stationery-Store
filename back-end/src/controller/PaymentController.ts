import { Request, Response } from "express";
import { MomoService } from "../services/MomoService";

export class PaymentController {
    private static momoService = MomoService.getInstance();

    public static async createMomoPayment(req: Request, res: Response): Promise<void> {
        try {
            const { orderId, amount, orderInfo } = req.body;
            
            if (!orderId || !amount || !orderInfo) {
                res.status(400).json({ message: "Missing required fields" });
                return;
            }

            const payUrl = await PaymentController.momoService.createPaymentRequest(orderId, amount, orderInfo);
            res.status(200).json({ payUrl });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public static async momoCallback(req: Request, res: Response): Promise<void> {
        try {
            const {
                partnerCode,
                orderId,
                requestId,
                amount,
                orderInfo,
                orderType,
                transId,
                resultCode,
                message,
                payType,
                responseTime,
                extraData,
                signature
            } = req.query;

            const isValid = PaymentController.momoService.verifyPayment(
                partnerCode as string,
                orderId as string,
                requestId as string,
                Number(amount),
                orderInfo as string,
                orderType as string,
                transId as string,
                Number(resultCode),
                message as string,
                payType as string,
                Number(responseTime),
                extraData as string,
                signature as string
            );

            if (!isValid) {
                res.status(400).json({ message: "Invalid signature" });
                return;
            }

            // Xử lý kết quả thanh toán
            if (Number(resultCode) === 0) {
                // Thanh toán thành công
                res.status(200).json({ message: "Payment successful" });
            } else {
                // Thanh toán thất bại
                res.status(400).json({ message: "Payment failed" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
} 