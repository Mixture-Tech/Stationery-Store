import { Request, Response } from "express";
import { CategoryParentService } from "../services/CategoryParentService";
import { Category_ParentDTO } from "../dto/Category_PrarentDTO";

export class CategoryParentController {
    static async createCategoryParent(req: Request, res: Response): Promise<void> {
        try {
            const categoryParentDTO: Category_ParentDTO = req.body;
            const categoryParent = await new CategoryParentService().createCategoryParent(categoryParentDTO);
            res.status(201).json(categoryParent);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getAllCategoryParents(req: Request, res: Response): Promise<void> {
        try {
            const categoryParents = await new CategoryParentService().getAllCategoryParents();
            res.status(200).json(categoryParents);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getCategoryParentById(req: Request, res: Response): Promise<void> {
        try {
            const categoryParent = await new CategoryParentService().getCategoryParentById(parseInt(req.params.id));
            if (!categoryParent) {
                res.status(404).json({ message: "Category Parent not found" });
                return;
            }
            res.status(200).json(categoryParent);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async updateCategoryParent(req: Request, res: Response): Promise<void> {
        try {
            const categoryParentDTO: Category_ParentDTO = req.body;
            const updatedCategoryParent = await new CategoryParentService().update(parseInt(req.params.id), categoryParentDTO);
            if (!updatedCategoryParent) {
                res.status(404).json({ message: "Category Parent not found" });
                return;
            }
            res.status(200).json(updatedCategoryParent);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteCategoryParent(req: Request, res: Response): Promise<void> {
        try {
            const isDeleted = await new CategoryParentService().delete(parseInt(req.params.id));
            if (!isDeleted) {
                res.status(404).json({ message: "Category Parent not found" });
                return;
            }
            res.status(200).json({ message: "Category Parent deleted successfully" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
