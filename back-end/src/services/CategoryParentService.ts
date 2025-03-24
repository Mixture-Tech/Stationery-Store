import { AppDataSource } from "../config/database";
import { Repository } from "typeorm";
import { Category_Parent } from "../entity/Category_Parent";
import { Category_ParentDTO } from "../dto/Category_PrarentDTO";

export class CategoryParentService {
    private categoryParentRepository: Repository<Category_Parent>;

    constructor() {
        AppDataSource.then((dataSource) => {
            this.categoryParentRepository = dataSource.getRepository(Category_Parent);
        }).catch((error) => {
            console.error("Lỗi khi kết nối DB:", error);
        });
    }

    async createCategoryParent(categoryParentDTO: Category_ParentDTO): Promise<Category_Parent> {
        const categoryParent = this.categoryParentRepository.create(categoryParentDTO);
        return await this.categoryParentRepository.save(categoryParent);
    }

    async getCategoryParentById(id: number): Promise<Category_Parent | null> {
        return await this.categoryParentRepository.findOneBy({ id });
    }

    async getAllCategoryParents(): Promise<Category_Parent[]> {
        return await this.categoryParentRepository.find();
    }

    async update(id: number, categoryParentDTO: Category_ParentDTO): Promise<Category_ParentDTO | null> {
        const categoryParent = await this.categoryParentRepository.findOneBy({ id });
        if (!categoryParent) return null;
        Object.assign(categoryParent, categoryParentDTO);
        return await this.categoryParentRepository.save(categoryParent);
    }

    async delete(id: number): Promise<boolean> {
        await this.categoryParentRepository.delete(id);
        return true;
    }
}
