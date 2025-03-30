import { Request, Response } from "express";
import { CartService } from "../services/CartService";
import { CartDTO } from "../dto/CartDTO";

export class CartController {
    static async createCart(req: Request, res: Response): Promise<void> {
        try {
            const cartDTO: CartDTO = req.body;
            const cart = await new CartService().createCart(cartDTO);
            res.status(201).json(cart);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getAllCarts(req: Request, res: Response): Promise<void> {
        try {
            const carts = await new CartService().getAllCarts();
            res.status(200).json(carts);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getCartById(req: Request, res: Response): Promise<void> {
        try {
            const cart = await new CartService().getCartById(parseInt(req.params.id));
            if (!cart) {
                res.status(404).json({ message: "Cart not found" });
                return;
            }
            res.status(200).json(cart);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async updateCart(req: Request, res: Response): Promise<void> {
        try {
            const cartDTO: CartDTO = req.body;
            const updatedCart = await new CartService().update(parseInt(req.params.id), cartDTO);
            if (!updatedCart) {
                res.status(404).json({ message: "Cart not found" });
                return;
            }
            res.status(200).json(updatedCart);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteCart(req: Request, res: Response): Promise<void> {
        try {
            const isDeleted = await new CartService().delete(parseInt(req.params.id));
            if (!isDeleted) {
                res.status(404).json({ message: "Cart not found" });
                return;
            }
            res.status(200).json({ message: "Cart deleted successfully" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
