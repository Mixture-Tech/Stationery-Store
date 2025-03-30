import { Request, Response } from "express";
import { ProvinceService } from "../services/ProvinceService";
import { ProvinceDTO } from "../dto/ProvinceDTO";

export class ProvinceController {
    static async createProvince(req: Request, res: Response): Promise<void> {
        try {
            const provinceDTO: ProvinceDTO = req.body;
            const province = await new ProvinceService().createProvince(provinceDTO);
            res.status(201).json(province);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getAllProvinces(req: Request, res: Response): Promise<void> {
        try {
            const provinces = await new ProvinceService().getAllProvinces();
            res.status(200).json(provinces);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getProvinceById(req: Request, res: Response): Promise<void> {
        try {
            const province = await new ProvinceService().getProvinceById(parseInt(req.params.id));
            if (!province) {
                res.status(404).json({ message: "Province not found" });
                return;
            }
            res.status(200).json(province);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async updateProvince(req: Request, res: Response): Promise<void> {
        try {
            const provinceDTO: ProvinceDTO = req.body;
            const updatedProvince = await new ProvinceService().update(parseInt(req.params.id), provinceDTO);
            if (!updatedProvince) {
                res.status(404).json({ message: "Province not found" });
                return;
            }
            res.status(200).json(updatedProvince);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteProvince(req: Request, res: Response): Promise<void> {
        try {
            const isDeleted = await new ProvinceService().delete(parseInt(req.params.id));
            if (!isDeleted) {
                res.status(404).json({ message: "Province not found" });
                return;
            }
            res.status(200).json({ message: "Province deleted successfully" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
