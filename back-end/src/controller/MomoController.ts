import { Request, Response } from 'express';
import { MomoService } from '../services/MomoService';

export class MomoController {
    private momoService: MomoService;

    constructor() {
        this.momoService = new MomoService();
    }

    async createPayment(req: Request, res: Response) {
        try {
            const { amount, orderInfo } = req.body;
            console.log('amount', amount);
            console.log('orderInfo', orderInfo);
            if (!amount || !orderInfo) {
                return res.status(400).json({
                    message: 'Thiếu thông tin amount hoặc orderInfo'
                });
            }

            const result = await this.momoService.createPayment(amount, orderInfo);

            if (result.resultCode === 0) {
                return res.status(200).json({
                    message: 'Tạo thanh toán thành công',
                    data: result
                });
            } else {
                return res.status(400).json({
                    message: 'Tạo thanh toán thất bại',
                    data: result
                });
            }
        } catch (error) {
            console.error('Lỗi khi tạo thanh toán:', error);
            return res.status(500).json({
                message: 'Có lỗi xảy ra khi tạo thanh toán',
                error: error
            });
        }
    }

    async handleIPN(req: Request, res: Response) {
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
            } = req.body;

            // TODO: Xác thực chữ ký
            // TODO: Cập nhật trạng thái đơn hàng

            return res.status(200).json({
                message: 'Nhận IPN thành công'
            });
        } catch (error) {
            console.error('Lỗi khi xử lý IPN:', error);
            return res.status(500).json({
                message: 'Có lỗi xảy ra khi xử lý IPN',
                error: error
            });
        }
    }
} 