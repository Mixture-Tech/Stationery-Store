import { Request, Response } from "express";
import { District } from "../entity/District";
import { DistrictService } from "../services/DistrictService";
import { AppDataSource } from "../config/database";

export class DistrictController {
    private districtService: DistrictService;

    constructor() {
        AppDataSource.then(dataSource => {
            this.districtService = new DistrictService(District, dataSource);
        });
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const districts = await this.districtService.getAll();
            res.json(districts);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy danh sách quận/huyện", error });
        }
    }

    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const district = await this.districtService.findById(id);
            if (!district) {
                res.status(404).json({ message: "Không tìm thấy quận/huyện" });
                return;
            }
            res.json(district);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy thông tin quận/huyện", error });
        }
    }

    getByProvinceId = async (req: Request, res: Response): Promise<void> => {
        try {
            const provinceId = parseInt(req.params.provinceId);
            const districts = await this.districtService.findByProvinceId(provinceId);
            res.json(districts);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy danh sách quận/huyện theo tỉnh/thành phố", error });
        }
    }

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const district = await this.districtService.createDistrict(req.body);
            res.status(201).json(district);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi tạo quận/huyện mới", error });
        }
    }

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const district = await this.districtService.updateDistrict(id, req.body);
            if (!district) {
                res.status(404).json({ message: "Không tìm thấy quận/huyện" });
                return;
            }
            res.json(district);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi cập nhật quận/huyện", error });
        }
    }

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const result = await this.districtService.deleteDistrict(id);
            if (!result) {
                res.status(404).json({ message: "Không tìm thấy quận/huyện" });
                return;
            }
            res.json({ message: "Đã xóa quận/huyện thành công" });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi xóa quận/huyện", error });
        }
    }
}
