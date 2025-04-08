import { Router } from 'express';
import { PaymentController } from '../controller/paymentController';

const router = Router();
const paymentController = new PaymentController();

router.post('/create', paymentController.createPayment);
router.post('/ipn', paymentController.handleIPN);

export default router; 