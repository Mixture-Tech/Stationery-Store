import { Request, Response } from "express";
import { Category } from "../entity/Category";
import { CategoryService } from "../services/CategoryService";
import { AppDataSource } from "../config/database";

export class CategoryController {
    private categoryService: CategoryService;

    constructor() {
        AppDataSource.then(dataSource => {
            this.categoryService = new CategoryService(Category, dataSource);
        });
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const categories = await this.categoryService.getAll();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy danh sách danh mục", error });
        }
    }

    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const category = await this.categoryService.findById(id);
            if (!category) {
                res.status(404).json({ message: "Không tìm thấy danh mục" });
                return;
            }
            res.json(category);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy thông tin danh mục", error });
        }
    }

    getByParentId = async (req: Request, res: Response): Promise<void> => {
        try {
            const parentId = parseInt(req.params.parentId);
            const categories = await this.categoryService.findByParentId(parentId);
            res.json(categories);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy danh sách danh mục con", error });
        }
    }

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const category = await this.categoryService.createCategory(req.body);
            res.status(201).json(category);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi tạo danh mục mới", error });
        }
    }

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const category = await this.categoryService.updateCategory(id, req.body);
            if (!category) {
                res.status(404).json({ message: "Không tìm thấy danh mục" });
                return;
            }
            res.json(category);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi cập nhật danh mục", error });
        }
    }

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const result = await this.categoryService.deleteCategory(id);
            if (!result) {
                res.status(404).json({ message: "Không tìm thấy danh mục" });
                return;
            }
            res.json({ message: "Đã xóa danh mục thành công" });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi xóa danh mục", error });
        }
    }
}
