import { Request, Response } from "express";
import { Province } from "../entity/Province";
import { ProvinceService } from "../services/ProvinceService";
import { AppDataSource } from "../config/database";

export class ProvinceController {
    private provinceService: ProvinceService;

    constructor() {
        AppDataSource.then(dataSource => {
            this.provinceService = new ProvinceService(Province, dataSource);
        });
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const provinces = await this.provinceService.getAll();
            res.json(provinces);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy danh sách tỉnh/thành phố", error });
        }
    }

    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const province = await this.provinceService.findById(id);
            if (!province) {
                res.status(404).json({ message: "Không tìm thấy tỉnh/thành phố" });
                return;
            }
            res.json(province);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy thông tin tỉnh/thành phố", error });
        }
    }

    getByAreaId = async (req: Request, res: Response): Promise<void> => {
        try {
            const areaId = parseInt(req.params.areaId);
            const provinces = await this.provinceService.findByAreaId(areaId);
            res.json(provinces);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy danh sách tỉnh/thành phố theo khu vực", error });
        }
    }

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const province = await this.provinceService.createProvince(req.body);
            res.status(201).json(province);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi tạo tỉnh/thành phố mới", error });
        }
    }

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const province = await this.provinceService.updateProvince(id, req.body);
            if (!province) {
                res.status(404).json({ message: "Không tìm thấy tỉnh/thành phố" });
                return;
            }
            res.json(province);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi cập nhật tỉnh/thành phố", error });
        }
    }

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const result = await this.provinceService.deleteProvince(id);
            if (!result) {
                res.status(404).json({ message: "Không tìm thấy tỉnh/thành phố" });
                return;
            }
            res.json({ message: "Đã xóa tỉnh/thành phố thành công" });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi xóa tỉnh/thành phố", error });
        }
    }
}
