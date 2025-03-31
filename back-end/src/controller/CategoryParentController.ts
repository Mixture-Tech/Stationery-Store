import { Request, Response } from "express";
import { Category_Parent } from "../entity/Category_Parent";
import { CategoryParentService } from "../services/CategoryParentService";
import { AppDataSource } from "../config/database";

export class CategoryParentController {
    private categoryParentService: CategoryParentService;

    constructor() {
        AppDataSource.then(dataSource => {
            this.categoryParentService = new CategoryParentService(Category_Parent, dataSource);
        });
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const categoryParents = await this.categoryParentService.getAll();
            res.json(categoryParents);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy danh sách danh mục cha", error });
        }
    }

    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const categoryParent = await this.categoryParentService.findById(id);
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
            const categoryParent = await this.categoryParentService.createCategoryParent(req.body);
            res.status(201).json(categoryParent);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi tạo danh mục cha mới", error });
        }
    }

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const categoryParent = await this.categoryParentService.updateCategoryParent(id, req.body);
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
            const result = await this.categoryParentService.deleteCategoryParent(id);
            if (!result) {
                res.status(404).json({ message: "Không tìm thấy danh mục cha" });
                return;
            }
            res.json({ message: "Đã xóa danh mục cha thành công" });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi xóa danh mục cha", error });
        }
    }
}
