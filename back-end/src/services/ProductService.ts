import { AppDataSource } from "../config/database";
import { Repository } from "typeorm";
import { Product } from "../entity/Product";
import { ProductDTO } from "../dto/ProductDTO";

export class ProductService {
    private productRepository: Repository<Product>;
    constructor() {
        AppDataSource.then((dataSource) => {
            this.productRepository = dataSource.getRepository(Product);
        }).catch((error) => {
            console.error("Lỗi khi kết nối DB:", error);
        });
    }

    async createProduct(ProductDTO: ProductDTO): Promise<Product> {
        const product = this.productRepository.create(ProductDTO);
        return await this.productRepository.save(product);
    }

    async getProductById(id: number): Promise<Product | null> {
        return await this.productRepository.findOneBy({id});
    }

    async getAllProducts(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    async update(id: number, ProductDTO: ProductDTO): Promise<ProductDTO | null> {
        const product = await this.productRepository.findOneBy({id});
        if (!product) return null;
        Object.assign(product, ProductDTO);
        return await this.productRepository.save(product);
    }

    async delete(id: number): Promise<Boolean>{
        const result  = await this.productRepository.delete(id);
        return true;
    }
}
