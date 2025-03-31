import { DataSource, EntityTarget } from "typeorm";
import { Product } from "../entity/Product";
import { BaseService } from "./BaseService";
import { ProductDTO } from "../dto/ProductDTO";

export class ProductService extends BaseService<Product, ProductDTO> {
    constructor(entity: EntityTarget<Product>, dataSource: DataSource) {
        super(entity, dataSource);
    }

    async findById(id_product: number): Promise<Product | null> {
        return this.repository.findOne({ 
            where: { id_product },
            relations: ["category", "orderDetails", "carts"]
        });
    }

    async findByName(name: string): Promise<Product | null> {
        return this.repository.findOne({ 
            where: { name },
            relations: ["category"]
        });
    }

    async findByCategoryId(id_category: number): Promise<Product[]> {
        return this.repository.find({
            where: { id_category },
            relations: ["category"]
        });
    }

    async findByBrand(brand: string): Promise<Product[]> {
        return this.repository.find({
            where: { brand },
            relations: ["category"]
        });
    }

    async createProduct(productDTO: ProductDTO): Promise<Product> {
        return this.create(productDTO);
    }

    async updateProduct(id_product: number, productDTO: ProductDTO): Promise<Product | null> {
        return this.update(id_product, productDTO);
    }

    async deleteProduct(id_product: number): Promise<boolean> {
        return this.delete(id_product);
    }
}
