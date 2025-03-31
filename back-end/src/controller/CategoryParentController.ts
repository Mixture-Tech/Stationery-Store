import { Request, Response } from "express";
import CategoryParentService from "../services/CategoryParentService";

export class CategoryParentController {
    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const categoryParents = await CategoryParentService.getAll();
            res.json(categoryParents);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy danh sách danh mục cha", error });
        }
    }

    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const categoryParent = await CategoryParentService.findById(id);
            if (!categoryParent) {
                res.status(404).json({ message: "Không tìm thấy danh mục cha" });
                return;
            }
            res.json(categoryParent);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy thông tin danh mục cha", error });
        }
    }

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const categoryParent = await CategoryParentService.createCategoryParent(req.body);
            res.status(201).json(categoryParent);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi tạo danh mục cha mới", error });
        }
    }

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const categoryParent = await CategoryParentService.updateCategoryParent(id, req.body);
            if (!categoryParent) {
                res.status(404).json({ message: "Không tìm thấy danh mục cha" });
                return;
            }
            res.json(categoryParent);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi cập nhật danh mục cha", error });
        }
    }

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const result = await CategoryParentService.deleteCategoryParent(id);
            if (!result) {
                res.status(404).json({ message: "Không tìm thấy danh mục cha" });
                return;
            }
            res.json({ message: "Đã xóa danh mục cha thành công" });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi xóa danh mục cha", error });
        }
    }

    getCategoriesByParentId = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const categories = await CategoryParentService.getCategoriesByParentId(id);
            res.json(categories);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy danh sách danh mục con", error });
        }
    }
}
