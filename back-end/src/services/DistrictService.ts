import { DataSource, EntityTarget } from "typeorm";
import { District } from "../entity/District";
import { BaseService } from "./BaseService";
import { DistrictDTO } from "../dto/DistrictDTO";

export class DistrictService extends BaseService<District, DistrictDTO> {
    constructor(entity: EntityTarget<District>, dataSource: DataSource) {
        super(entity, dataSource);
    }

    async findById(id_district: number): Promise<District | null> {
        return this.repository.findOne({ 
            where: { id_district },
            relations: ["province", "orders", "orderDetails"]
        });
    }

    async findByName(name: string): Promise<District | null> {
        return this.repository.findOne({ 
            where: { name },
            relations: ["province"]
        });
    }

    async findByProvinceId(id_province: number): Promise<District[]> {
        return this.repository.find({
            where: { id_province },
            relations: ["province"]
        });
    }

    async createDistrict(districtDTO: DistrictDTO): Promise<District> {
        return this.create(districtDTO);
    }

    async updateDistrict(id_district: number, districtDTO: DistrictDTO): Promise<District | null> {
        return this.update(id_district, districtDTO);
    }

    async deleteDistrict(id_district: number): Promise<boolean> {
        return this.delete(id_district);
    }
}