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
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ message: "ID không hợp lệ" });
                return;
            }
            const product = await new ProductService().getProductById(id);
            if (!product) {
                res.status(404).json({ message: "Không tìm thấy sản phẩm" });
                return;
            }
            res.status(200).json(product);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ message: "ID không hợp lệ" });
                return;
            }
            const productDTO: ProductDTO = req.body;
            const updatedProduct = await new ProductService().update(id, productDTO);
            if (!updatedProduct) {
                res.status(404).json({ message: "Không tìm thấy sản phẩm" });
                return;
            }
            res.status(200).json(updatedProduct);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ message: "ID không hợp lệ" });
                return;
            }
            const isDeleted = await new ProductService().delete(id);
            if (!isDeleted) {
                res.status(404).json({ message: "Không tìm thấy sản phẩm" });
                return;
            }
            res.status(200).json({ message: "Xóa sản phẩm thành công" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getProductByName(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.query;
            if (!name || typeof name !== 'string') {
                res.status(400).json({ message: "Tên sản phẩm không hợp lệ" });
                return;
            }
            const products = await new ProductService().getProductByName(name);
            res.status(200).json(products);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getProductByCategoryName(req: Request, res: Response): Promise<void> {
        try {
            const { categoryName } = req.query;
            if (!categoryName || typeof categoryName !== 'string') {
                res.status(400).json({ message: "Tên danh mục không hợp lệ" });
                return;
            }
            const products = await new ProductService().getProductByCategoryName(categoryName);
            res.status(200).json(products);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
