import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryService";
import { CategoryDTO } from "../dto/CategoryDTO";

export class CategoryController {
    static async createCategory(req: Request, res: Response): Promise<void> {
        try {
            const categoryDTO: CategoryDTO = req.body;
            const category = await new CategoryService().createCategory(categoryDTO);
            res.status(201).json(category);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getAllCategories(req: Request, res: Response): Promise<void> {
        try {
            const categories = await new CategoryService().getAllCategories();
            res.status(200).json(categories);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getCategoryById(req: Request, res: Response): Promise<void> {
        try {
            const category = await new CategoryService().getCategoryById(parseInt(req.params.id));
            if (!category) {
                res.status(404).json({ message: "Category not found" });
                return;
            }
            res.status(200).json(category);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async updateCategory(req: Request, res: Response): Promise<void> {
        try {
            const categoryDTO: CategoryDTO = req.body;
            const updatedCategory = await new CategoryService().update(parseInt(req.params.id), categoryDTO);
            if (!updatedCategory) {
                res.status(404).json({ message: "Category not found" });
                return;
            }
            res.status(200).json(updatedCategory);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteCategory(req: Request, res: Response): Promise<void> {
        try {
            const isDeleted = await new CategoryService().delete(parseInt(req.params.id));
            if (!isDeleted) {
                res.status(404).json({ message: "Category not found" });
                return;
            }
            res.status(200).json(isDeleted);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
