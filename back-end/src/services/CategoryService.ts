import { AppDataSource } from "../config/database";
import { Repository } from "typeorm";
import { Category } from "../entity/Category";
import { CategoryDTO } from "../dto/CategoryDTO";

export class CategoryService {
    private categoryRepository: Repository<Category>;

    constructor() {
        AppDataSource.then((dataSource) => {
            this.categoryRepository = dataSource.getRepository(Category);
        }).catch((error) => {
            console.error("Lỗi khi kết nối DB:", error);
        });
    }

    async createCategory(categoryDTO: CategoryDTO): Promise<Category> {
        const category = this.categoryRepository.create(categoryDTO);
        return await this.categoryRepository.save(category);
    }

    async getCategoryById(id: number): Promise<Category | null> {
        return await this.categoryRepository.findOneBy({ id });
    }

    async getAllCategories(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async update(id: number, categoryDTO: CategoryDTO): Promise<CategoryDTO | null> {
        const category = await this.categoryRepository.findOneBy({ id });
        if (!category) return null;
        Object.assign(category, categoryDTO);
        return await this.categoryRepository.save(category);
    }

    async delete(id: number): Promise<boolean> {
        await this.categoryRepository.delete(id);
        return true;
    }
}
