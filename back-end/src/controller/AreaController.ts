import { Request, Response } from "express";
import { Area } from "../entity/Area";
import { AreaService } from "../services/AreaService";
import { AppDataSource } from "../config/database";

export class AreaController {
    private areaService: AreaService;

    constructor() {
        AppDataSource.then(dataSource => {
            this.areaService = new AreaService(Area, dataSource);
        });
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const areas = await this.areaService.getAll();
            res.json(areas);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy danh sách khu vực", error });
        }
    }

    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const area = await this.areaService.findById(id);
            if (!area) {
                res.status(404).json({ message: "Không tìm thấy khu vực" });
                return;
            }
            res.json(area);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy thông tin khu vực", error });
        }
    }

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const area = await this.areaService.createArea(req.body);
            res.status(201).json(area);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi tạo khu vực mới", error });
        }
    }

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const area = await this.areaService.updateArea(id, req.body);
            if (!area) {
                res.status(404).json({ message: "Không tìm thấy khu vực" });
                return;
            }
            res.json(area);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi cập nhật khu vực", error });
        }
    }

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const result = await this.areaService.deleteArea(id);
            if (!result) {
                res.status(404).json({ message: "Không tìm thấy khu vực" });
                return;
            }
            res.json({ message: "Đã xóa khu vực thành công" });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi xóa khu vực", error });
        }
    }
}
