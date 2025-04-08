import { AppDataSource } from "../config/database";
import { Category } from "../entity/Category";
import { Repository } from "typeorm";

class CategoryService {
    private categoryRepository: Repository<Category>;

    constructor() {
        this.initRepository();
    }

    private async initRepository() {
        const dataSource = await AppDataSource;
        this.categoryRepository = dataSource.getRepository(Category);
    }

    async getAll() {
        if (!this.categoryRepository) {
            await this.initRepository();
        }
        return await this.categoryRepository.find();
    }

    async getById(id_category: number) {
        if (!this.categoryRepository) {
            await this.initRepository();
        }
        return await this.categoryRepository.findOne({
            where: { id_category },
        });
    }

    async getByName(name_category: string) {
        if (!this.categoryRepository) {
            await this.initRepository();
        }
        return await this.categoryRepository.findOne({
            where: { name_category },
        });
    }

    async getByParentId(id_parent: number) {
        if (!this.categoryRepository) {
            await this.initRepository();
        }
        return await this.categoryRepository.find({
            where: { id_parent },
        });
    }

    async create(categoryData: Partial<Category>) {
        if (!this.categoryRepository) {
            await this.initRepository();
        }
        const category = this.categoryRepository.create(categoryData);
        return await this.categoryRepository.save(category);
    }

    async update(id_category: number, categoryData: Partial<Category>) {
        if (!this.categoryRepository) {
            await this.initRepository();
        }
        await this.categoryRepository.update(id_category, categoryData);
        return await this.getById(id_category);
    }

    async delete(id_category: number) {
        if (!this.categoryRepository) {
            await this.initRepository();
        }
        return await this.categoryRepository.delete(id_category);
    }

    async getCategoryByName(name: string) {
        if (!this.categoryRepository) {
            await this.initRepository();
        }
        return await this.categoryRepository.findOne({ where: { name_category: name } });
    }

    async hideCategory(id_category: number): Promise<any> {
        return this.categoryRepository.update(id_category, { hide: true });
    }
}

export default new CategoryService();
