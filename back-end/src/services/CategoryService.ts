import { DataSource, EntityTarget } from "typeorm";
import { Category } from "../entity/Category";
import { BaseService } from "./BaseService";
import { CategoryDTO } from "../dto/CategoryDTO";

export class CategoryService extends BaseService<Category, CategoryDTO> {
    constructor(entity: EntityTarget<Category>, dataSource: DataSource) {
        super(entity, dataSource);
    }

    async findById(id_category: number): Promise<Category | null> {
        return this.repository.findOne({ 
            where: { id_category },
            relations: ["categoryParent", "products"]
        });
    }

    async findByName(name_category: string): Promise<Category | null> {
        return this.repository.findOne({ 
            where: { name_category },
            relations: ["categoryParent"]
        });
    }

    async findByParentId(id_parent: number): Promise<Category[]> {
        return this.repository.find({
            where: { id_parent },
            relations: ["categoryParent"]
        });
    }

    async createCategory(categoryDTO: CategoryDTO): Promise<Category> {
        return this.create(categoryDTO);
    }

    async updateCategory(id_category: number, categoryDTO: CategoryDTO): Promise<Category | null> {
        return this.update(id_category, categoryDTO);
    }

    async deleteCategory(id_category: number): Promise<boolean> {
        return this.delete(id_category);
    }
}
