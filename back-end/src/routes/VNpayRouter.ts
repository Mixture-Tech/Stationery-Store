import { Router } from "express";
import { createPaymentUrl, handleReturn } from '../controller/VnpayController';

const router = Router();

router.get('/vnpay/create_payment_url', createPaymentUrl);
router.get('/vnpay/vnpay_return', handleReturn);

export default router;