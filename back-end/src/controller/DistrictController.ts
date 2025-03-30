import { Request, Response } from "express";
import { DistrictService } from "../services/DistrictService";
import { DistrictDTO } from "../dto/DistrictDTO";

export class DistrictController {
    static async createDistrict(req: Request, res: Response): Promise<void> {
        try {
            const districtDTO: DistrictDTO = req.body;
            const district = await new DistrictService().createDistrict(districtDTO);
            res.status(201).json(district);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getAllDistricts(req: Request, res: Response): Promise<void> {
        try {
            const districts = await new DistrictService().getAllDistricts();
            res.status(200).json(districts);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getDistrictById(req: Request, res: Response): Promise<void> {
        try {
            const district = await new DistrictService().getDistrictById(parseInt(req.params.id));
            if (!district) {
                res.status(404).json({ message: "District not found" });
                return;
            }
            res.status(200).json(district);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteDistrict(req: Request, res: Response): Promise<void> {
        try {
            const isDeleted = await new DistrictService().delete(parseInt(req.params.id));
            if (!isDeleted) {
                res.status(404).json({ message: "District not found" });
                return;
            }
            res.status(200).json({ message: "District deleted successfully" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
