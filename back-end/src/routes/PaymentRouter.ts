import { Router } from "express";
import { PaymentController } from "../controller/PaymentController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

// Tạo yêu cầu thanh toán MoMo
router.post("/momo/create", authenticateToken, PaymentController.createMomoPayment);

// Callback từ MoMo
router.get("/momo/callback", PaymentController.momoCallback);

export default router; 