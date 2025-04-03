import { Request, Response } from "express";
import { CartService } from "../services/CartService";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
                role: string;
            };
        }
    }
}

export class CartController {
    private static cartService = CartService.getInstance();

    // Lấy giỏ hàng của người dùng
    static async getCart(req: Request, res: Response): Promise<void> {
        try {
            const user = req.user;
            if (!user) {
                res.status(401).json({
                    success: false,
                    message: "Chưa đăng nhập"
                });
                return;
            }

            const cart = await CartController.cartService.getCartByUserId(user.id);
            res.status(200).json({
                success: true,
                data: cart
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Lỗi khi lấy giỏ hàng"
            });
        }
    }

    // Thêm sản phẩm vào giỏ hàng
    static async addToCart(req: Request, res: Response): Promise<void> {
        try {
            const user = req.user;
            if (!user) {
                res.status(401).json({
                    success: false,
                    message: "Chưa đăng nhập"
                });
                return;
            }

            const { productId, quantity } = req.body;

            if (!productId || !quantity) {
                res.status(400).json({
                    success: false,
                    message: "Thiếu thông tin sản phẩm hoặc số lượng"
                });
                return;
            }

            const cart = await CartController.cartService.addToCart(user.id, productId, quantity);
            res.status(200).json({
                success: true,
                data: cart
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Lỗi khi thêm sản phẩm vào giỏ hàng"
            });
        }
    }

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    static async updateCartItem(req: Request, res: Response): Promise<void> {
        try {
            const user = req.user;
            if (!user) {
                res.status(401).json({
                    success: false,
                    message: "Chưa đăng nhập"
                });
                return;
            }

            const { productId, quantity } = req.body;

            if (!productId || !quantity) {
                res.status(400).json({
                    success: false,
                    message: "Thiếu thông tin sản phẩm hoặc số lượng"
                });
                return;
            }

            const cart = await CartController.cartService.updateCartItem(user.id, productId, quantity);
            res.status(200).json({
                success: true,
                data: cart
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Lỗi khi cập nhật giỏ hàng"
            });
        }
    }

    // Xóa sản phẩm khỏi giỏ hàng
    static async removeFromCart(req: Request, res: Response): Promise<void> {
        try {
            const user = req.user;
            if (!user) {
                res.status(401).json({
                    success: false,
                    message: "Chưa đăng nhập"
                });
                return;
            }

            const { productId } = req.params;

            if (!productId) {
                res.status(400).json({
                    success: false,
                    message: "Thiếu thông tin sản phẩm"
                });
                return;
            }

            await CartController.cartService.removeFromCart(user.id, parseInt(productId));
            res.status(200).json({
                success: true,
                message: "Xóa sản phẩm khỏi giỏ hàng thành công"
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Lỗi khi xóa sản phẩm khỏi giỏ hàng"
            });
        }
    }
}
