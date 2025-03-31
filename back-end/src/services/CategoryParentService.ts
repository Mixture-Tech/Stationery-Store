import { AppDataSource } from "../config/database";
import { Category_Parent } from "../entity/Category_Parent";
import { Repository } from "typeorm";
import { CategoryParentDTO } from "../dto/CategoryParentDTO";

class CategoryParentService {
    private categoryParentRepository: Repository<Category_Parent>;

    constructor() {
        this.initRepository();
    }

    private async initRepository() {
        const dataSource = await AppDataSource;
        this.categoryParentRepository = dataSource.getRepository(Category_Parent);
    }

    async getAll() {
        if (!this.categoryParentRepository) {
            await this.initRepository();
        }
        return await this.categoryParentRepository.find({
            relations: ["categories"]
        });
    }

    async findById(id_parent: number) {
        if (!this.categoryParentRepository) {
            await this.initRepository();
        }
        return await this.categoryParentRepository.findOne({
            where: { id_parent },
            relations: ["categories"]
        });
    }

    async getByName(name_parent: string) {
        if (!this.categoryParentRepository) {
            await this.initRepository();
        }
        return await this.categoryParentRepository.findOne({
            where: { name_parent },
            relations: ["categories"]
        });
    }

    async createCategoryParent(categoryParentData: CategoryParentDTO) {
        if (!this.categoryParentRepository) {
            await this.initRepository();
        }
        const categoryParent = this.categoryParentRepository.create(categoryParentData);
        return await this.categoryParentRepository.save(categoryParent);
    }

    async updateCategoryParent(id_parent: number, categoryParentData: CategoryParentDTO) {
        if (!this.categoryParentRepository) {
            await this.initRepository();
        }
        await this.categoryParentRepository.update(id_parent, categoryParentData);
        return await this.findById(id_parent);
    }

    async deleteCategoryParent(id_parent: number) {
        if (!this.categoryParentRepository) {
            await this.initRepository();
        }
        const result = await this.categoryParentRepository.delete(id_parent);
        return result.affected ? true : false;
    }

    async getCategoriesByParentId(id_parent: number) {
        if (!this.categoryParentRepository) {
            await this.initRepository();
        }
        const categoryParent = await this.categoryParentRepository.findOne({
            where: { id_parent },
            relations: ["categories"]
        });
        return categoryParent?.categories || [];
    }
}

export default new CategoryParentService();
