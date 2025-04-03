import { Router } from "express";
import { CartController } from "../controller/CartController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

// Lấy giỏ hàng của người dùng
router.get("/cart/get-cart-by-user", authenticateToken, CartController.getCart);

// Thêm sản phẩm vào giỏ hàng
router.post("/cart/add-to-cart", authenticateToken, CartController.addToCart);

// Cập nhật số lượng sản phẩm trong giỏ hàng
router.put("/cart/update-cart-item", authenticateToken, CartController.updateCartItem);

// Xóa sản phẩm khỏi giỏ hàng
router.delete("/cart/remove-from-cart/:productId", authenticateToken, CartController.removeFromCart);

export default router; 