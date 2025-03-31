import { Request, Response } from "express";
import { Product } from "../entity/Product";
import { ProductService } from "../services/ProductService";
import { AppDataSource } from "../config/database";

export class ProductController {
    private productService: ProductService;

    constructor() {
        AppDataSource.then(dataSource => {
            this.productService = new ProductService(Product, dataSource);
        });
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const products = await this.productService.getAll();
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy danh sách sản phẩm", error });
        }
    }

    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const product = await this.productService.findById(id);
            if (!product) {
                res.status(404).json({ message: "Không tìm thấy sản phẩm" });
                return;
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy thông tin sản phẩm", error });
        }
    }

    getByCategoryId = async (req: Request, res: Response): Promise<void> => {
        try {
            const categoryId = parseInt(req.params.categoryId);
            const products = await this.productService.findByCategoryId(categoryId);
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy danh sách sản phẩm theo danh mục", error });
        }
    }

    getByBrand = async (req: Request, res: Response): Promise<void> => {
        try {
            const brand = req.params.brand;
            const products = await this.productService.findByBrand(brand);
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy danh sách sản phẩm theo thương hiệu", error });
        }
    }

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const product = await this.productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi tạo sản phẩm mới", error });
        }
    }

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const product = await this.productService.updateProduct(id, req.body);
            if (!product) {
                res.status(404).json({ message: "Không tìm thấy sản phẩm" });
                return;
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi cập nhật sản phẩm", error });
        }
    }

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const result = await this.productService.deleteProduct(id);
            if (!result) {
                res.status(404).json({ message: "Không tìm thấy sản phẩm" });
                return;
            }
            res.json({ message: "Đã xóa sản phẩm thành công" });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi xóa sản phẩm", error });
        }
    }
}

