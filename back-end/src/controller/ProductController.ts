import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import { ProductDTO } from "../dto/ProductDTO";

export class ProductController {
    static async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const productDTO: ProductDTO = req.body;
            const product = await new ProductService().createProduct(productDTO);
            res.status(201).json(product);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await new ProductService().getAllProducts();
            res.status(200).json(products);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getProductById(req: Request, res: Response): Promise<void> {
        try {
            const product = await new ProductService().getProductById(parseInt(req.params.id));
            if (!product) {
                res.status(404).json({ message: "Product not found" });
                return;
            }
            res.status(200).json(product);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const productDTO: ProductDTO = req.body;
            const updatedProduct = await new ProductService().update(parseInt(req.params.id), productDTO);
            if (!updatedProduct) {
                res.status(404).json({ message: "Product not found" });
                return;
            }
            res.status(200).json(updatedProduct);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const isDeleted = await new ProductService().delete(parseInt(req.params.id));
            if (!isDeleted) {
                res.status(404).json({ message: "Product not found" });
                return;
            }
            res.status(200).json({ message: "Product deleted successfully" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
