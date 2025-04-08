import { Request, Response } from 'express';
import { MomoService } from '../services/momoService';

export class PaymentController {
    private momoService: MomoService;

    constructor() {
        this.momoService = new MomoService();
    }

    public createPayment = async (req: Request, res: Response): Promise<void> => {
        try {
            const { amount, orderId, orderInfo } = req.body;

            if (!amount || !orderId || !orderInfo) {
                res.status(400).json({
                    message: 'Missing required fields'
                });
                return;
            }
            console.log("hehe");
            const result = await this.momoService.createPayment(amount, orderId, orderInfo);
            res.status(200).json(result);
        } catch (error) {
            console.error('Payment error:', error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    };

    public handleIPN = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = req.body;
            console.log('IPN received:', result);
            
            res.status(200).json({
                message: 'IPN received successfully'
            });
        } catch (error) {
            console.error('IPN error:', error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    };
} 