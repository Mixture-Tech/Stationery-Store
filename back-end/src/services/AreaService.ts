import { DataSource, EntityTarget } from "typeorm";
import { Area } from "../entity/Area";
import { BaseService } from "./BaseService";
import { AreaDTO } from "../dto/AreaDTO";

export class AreaService extends BaseService<Area, AreaDTO> {
    constructor(entity: EntityTarget<Area>, dataSource: DataSource) {
        super(entity, dataSource);
    }

    async findById(id_area: number): Promise<Area | null> {
        return this.repository.findOne({ 
            where: { id_area },
            relations: ["provinces"]
        });
    }

    async findByName(name: string): Promise<Area | null> {
        return this.repository.findOne({ 
            where: { name },
            relations: ["provinces"]
        });
    }

    async createArea(areaDTO: AreaDTO): Promise<Area> {
        return this.create(areaDTO);
    }

    async updateArea(id_area: number, areaDTO: AreaDTO): Promise<Area | null> {
        return this.update(id_area, areaDTO);
    }

    async deleteArea(id_area: number): Promise<boolean> {
        return this.delete(id_area);
    }
}
