import { Request, Response } from "express";
import CategoryService from "../services/CategoryService";

class CategoryController {
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const categories = await CategoryService.getAll();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ message: "Lỗi server", error });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const category = await CategoryService.getById(id);
            if (!category) {
                res.status(404).json({ message: "Không tìm thấy danh mục" });
                return;
            }
            res.json(category);
        } catch (error) {
            res.status(500).json({ message: "Lỗi server", error });
        }
    }

    async getByParentId(req: Request, res: Response): Promise<void> {
        try {
            const parentId = parseInt(req.params.parentId);
            const categories = await CategoryService.getByParentId(parentId);
            res.json(categories);
        } catch (error) {
            res.status(500).json({ message: "Lỗi server", error });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const category = await CategoryService.create(req.body);
            res.status(201).json(category);
        } catch (error) {
            res.status(500).json({ message: "Lỗi server", error });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const category = await CategoryService.update(id, req.body);
            if (!category) {
                res.status(404).json({ message: "Không tìm thấy danh mục" });
                return;
            }
            res.json(category);
        } catch (error) {
            res.status(500).json({ message: "Lỗi server", error });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            await CategoryService.delete(id);
            res.json({ message: "Xóa danh mục thành công" });
        } catch (error) {
            res.status(500).json({ message: "Lỗi server", error });
        }
    }

    async getCategoryByName(req: Request, res: Response): Promise<void> {
        try {
            const name = req.params.name;
            const category = await CategoryService.getCategoryByName(name);
            if (!category) {
                res.status(404).json({ message: "Không tìm thấy danh mục" });
                return;
            }
            res.json(category);
        } catch (error) {
            res.status(500).json({ message: "Lỗi server", error });
        }
    }

    async hide(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const result = await CategoryService.hideCategory(id);
            if (!result) {
                res.status(404).json({ message: "Không tìm thấy danh mục" });
                return;
            }
            res.json({ message: "Đã ẩn danh mục thành công" });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi ẩn danh mục", error });
        }
    };
}

export default new CategoryController();
