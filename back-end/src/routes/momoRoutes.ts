import { Router } from 'express';
import { MomoController } from '../controller/MomoController';

const router = Router();
const momoController = new MomoController();

// Tạo thanh toán
router.post('/momo/create-payment', (req, res) => {
    momoController.createPayment(req, res);
});

// Xử lý IPN từ MoMo
router.post('/momo/ipn', (req, res) => {
    momoController.handleIPN(req, res);
});

export default router; 