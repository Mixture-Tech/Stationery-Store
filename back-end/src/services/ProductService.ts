import { AppDataSource } from "../config/database";
import { Repository, Like } from "typeorm";
import { Product } from "../entity/Product";
import { ProductDTO } from "../dto/ProductDTO";

export class ProductService {
    private productRepository: Repository<Product>;

    constructor() {
        this.initializeRepository();
    }

    private async initializeRepository() {
        try {
            const dataSource = await AppDataSource;
            this.productRepository = dataSource.getRepository(Product);
        } catch (error) {
            console.error("Lỗi khi kết nối DB:", error);
            throw error;
        }
    }

    private async ensureRepository() {
        if (!this.productRepository) {
            await this.initializeRepository();
        }
    }

    async createProduct(ProductDTO: ProductDTO): Promise<Product> {
        await this.ensureRepository();
        const product = this.productRepository.create(ProductDTO);
        return await this.productRepository.save(product);
    }

    async getProductById(id: number): Promise<Product | null> {
        await this.ensureRepository();
        if (!id || isNaN(id)) {
            return null;
        }
        return await this.productRepository.findOneBy({id});
    }

    async getAllProducts(): Promise<Product[]> {
        await this.ensureRepository();
        return await this.productRepository.find({
            relations: ['category']
        });
    }

    async update(id: number, ProductDTO: ProductDTO): Promise<ProductDTO | null> {
        await this.ensureRepository();
        if (!id || isNaN(id)) {
            return null;
        }
        const product = await this.productRepository.findOneBy({id});
        if (!product) return null;
        Object.assign(product, ProductDTO);
        return await this.productRepository.save(product);
    }

    async delete(id: number): Promise<Boolean> {
        await this.ensureRepository();
        if (!id || isNaN(id)) {
            return false;
        }
        const result = await this.productRepository.delete(id);
        return result.affected ? true : false;
    }

    async getProductByName(name: string): Promise<Product[]> {
        await this.ensureRepository();
        if (!name || name.trim() === '') {
            return [];
        }
        return await this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .where('product.name LIKE :name', { name: `%${name.trim()}%` })
            .getMany();
    }

    async getProductByCategoryName(categoryName: string): Promise<Product[]> {
        await this.ensureRepository();
        if (!categoryName || categoryName.trim() === '') {
            return [];
        }
        return await this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .where('category.name_category LIKE :categoryName', { categoryName: `%${categoryName.trim()}%` })
            .getMany();
    }
}
