import { DataSource, EntityTarget } from "typeorm";
import { Category_Parent } from "../entity/Category_Parent";
import { BaseService } from "./BaseService";
import { CategoryParentDTO } from "../dto/CategoryParentDTO";

export class CategoryParentService extends BaseService<Category_Parent, CategoryParentDTO> {
    constructor(entity: EntityTarget<Category_Parent>, dataSource: DataSource) {
        super(entity, dataSource);
    }

    async findById(id_parent: number): Promise<Category_Parent | null> {
        return this.repository.findOne({ 
            where: { id_parent },
            relations: ["categories"]
        });
    }

    async findByName(name_parent: string): Promise<Category_Parent | null> {
        return this.repository.findOne({ 
            where: { name_parent },
            relations: ["categories"]
        });
    }

    async createCategoryParent(categoryParentDTO: CategoryParentDTO): Promise<Category_Parent> {
        return this.create(categoryParentDTO);
    }

    async updateCategoryParent(id_parent: number, categoryParentDTO: CategoryParentDTO): Promise<Category_Parent | null> {
        return this.update(id_parent, categoryParentDTO);
    }

    async deleteCategoryParent(id_parent: number): Promise<boolean> {
        return this.delete(id_parent);
    }
}
