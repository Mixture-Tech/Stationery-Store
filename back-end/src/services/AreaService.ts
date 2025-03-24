import { AppDataSource } from "../config/database";
import { Repository } from "typeorm";
import { Area } from "../entity/Area";
import { AreaDTO } from "../dto/AreaDTO";

export class AreaService {
    private areaRepository: Repository<Area>;

    constructor() {
        AppDataSource.then((dataSource) => {
            this.areaRepository = dataSource.getRepository(Area);
        }).catch((error) => {
            console.error("Lỗi khi kết nối DB:", error);
        });
    }

    async createArea(areaDTO: AreaDTO): Promise<Area> {
        const area = this.areaRepository.create(areaDTO);
        return await this.areaRepository.save(area);
    }

    async getAreaById(id: number): Promise<Area | null> {
        return await this.areaRepository.findOneBy({ id });
    }

    async getAllAreas(): Promise<Area[]> {
        return await this.areaRepository.find();
    }

    async update(id: number, areaDTO: AreaDTO): Promise<AreaDTO | null> {
        const area = await this.areaRepository.findOneBy({ id });
        if (!area) return null;
        Object.assign(area, areaDTO);
        return await this.areaRepository.save(area);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.areaRepository.delete(id);
        return result.affected !== 0;
    }
}
