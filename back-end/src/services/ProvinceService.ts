import { DataSource, EntityTarget } from "typeorm";
import { Province } from "../entity/Province";
import { BaseService } from "./BaseService";
import { ProvinceDTO } from "../dto/ProvinceDTO";

export class ProvinceService extends BaseService<Province, ProvinceDTO> {
    constructor(entity: EntityTarget<Province>, dataSource: DataSource) {
        super(entity, dataSource);
    }

    async findById(id_province: number): Promise<Province | null> {
        return this.repository.findOne({ 
            where: { id_province },
            relations: ["area", "districts"]
        });
    }

    async findByName(name: string): Promise<Province | null> {
        return this.repository.findOne({ 
            where: { name },
            relations: ["area", "districts"]
        });
    }

    async findByAreaId(id_area: number): Promise<Province[]> {
        return this.repository.find({
            where: { id_area },
            relations: ["area", "districts"]
        });
    }

    async createProvince(provinceDTO: ProvinceDTO): Promise<Province> {
        return this.create(provinceDTO);
    }

    async updateProvince(id_province: number, provinceDTO: ProvinceDTO): Promise<Province | null> {
        return this.update(id_province, provinceDTO);
    }

    async deleteProvince(id_province: number): Promise<boolean> {
        return this.delete(id_province);
    }
}
