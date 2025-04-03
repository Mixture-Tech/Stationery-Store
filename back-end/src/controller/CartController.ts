import { Request, Response } from "express";
import { CartService } from "../services/CartService";

interface RequestUser {
    id: number;
    email: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: RequestUser;
        }
    }
}

export class CartController {
    private static cartService: CartService;

    public static async initialize() {
        CartController.cartService = await CartService.getInstance();
    }

    // Lấy giỏ hàng của người dùng
    public static async getCart(req: Request, res: Response): Promise<void> {
        try {
            console.log('hehe');
            const user = req.user;
            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const cart = await CartController.cartService.getCartByUser(user.id);
            res.status(200).json(cart);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // Thêm sản phẩm vào giỏ hàng
    public static async addToCart(req: Request, res: Response): Promise<void> {
        try {
            const user = req.user;
            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const { productId, quantity } = req.body;
            if (!productId || !quantity) {
                res.status(400).json({ message: "Missing required fields" });
                return;
            }

            const cart = await CartController.cartService.addToCart(user.id, productId, quantity);
            res.status(200).json(cart);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    public static async updateCartItem(req: Request, res: Response): Promise<void> {
        try {
            const user = req.user;
            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const { productId, quantity } = req.body;
            if (!productId || !quantity) {
                res.status(400).json({ message: "Missing required fields" });
                return;
            }

            const cart = await CartController.cartService.updateCartItem(user.id, productId, quantity);
            res.status(200).json(cart);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // Xóa sản phẩm khỏi giỏ hàng
    public static async removeFromCart(req: Request, res: Response): Promise<void> {
        try {
            const user = req.user;
            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const { productId } = req.params;
            if (!productId) {
                res.status(400).json({ message: "Missing product ID" });
                return;
            }

            await CartController.cartService.removeFromCart(user.id, parseInt(productId));
            res.status(200).json({ message: "Product removed from cart" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
