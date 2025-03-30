import { Request, Response } from "express";
import { AreaService } from "../services/AreaService";
import { AreaDTO } from "../dto/AreaDTO";

export class AreaController {
    static async createArea(req: Request, res: Response): Promise<void> {
        try {
            const areaDTO: AreaDTO = req.body;
            const area = await new AreaService().createArea(areaDTO);
            res.status(201).json(area);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getAllAreas(req: Request, res: Response): Promise<void> {
        try {
            const areas = await new AreaService().getAllAreas();
            res.status(200).json(areas);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getAreaById(req: Request, res: Response): Promise<void> {
        try {
            const area = await new AreaService().getAreaById(parseInt(req.params.id));
            if (!area) {
                res.status(404).json({ message: "Area not found" });
                return;
            }
            res.status(200).json(area);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async updateArea(req: Request, res: Response): Promise<void> {
        try {
            const areaDTO: AreaDTO = req.body;
            const updatedArea = await new AreaService().update(parseInt(req.params.id), areaDTO);
            if (!updatedArea) {
                res.status(404).json({ message: "Area not found" });
                return;
            }
            res.status(200).json(updatedArea);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteArea(req: Request, res: Response): Promise<void> {
        try {
            const isDeleted = await new AreaService().delete(parseInt(req.params.id));
            if (!isDeleted) {
                res.status(404).json({ message: "Area not found" });
                return;
            }
            res.status(200).json({ message: "Area deleted successfully" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
