import { Repository, DataSource, EntityTarget, Like } from "typeorm";
import { Product } from "../entity/Product";
import { BaseService } from "./BaseService";
import { ProductDTO } from "../dto/ProductDTO";
import { Request } from 'express';
import { uploadConfig } from "../config/uploadImg";


export class ProductService extends BaseService<Product, ProductDTO> {
    private uploadMiddleware = uploadConfig.uploadMiddleware // Middleware để xử lý upload file

    constructor(entity: EntityTarget<Product>, dataSource: DataSource) {
        super(entity, dataSource);
    }

    async findById(id_product: number): Promise<Product | null> {
        return this.repository.findOne({ 
            where: { id_product },
            relations: ["category", "orderDetails", "carts"]
        });
    }

    async findByName(name: string): Promise<Product[]> {
        return this.repository.find({
            where: {
                name: Like(`%${name}%`)
            },
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

    async uploadImage(req: Request): Promise<string> {
        console.log('Bắt đầu upload ảnh...');
        return new Promise((resolve, reject) => {
            this.uploadMiddleware(req, null as any, (error) => {
                if (error) {
                    console.error('Lỗi từ multer:', error);
                    reject(new Error(`Lỗi khi upload ảnh: ${error.message}`));
                    return;
                }

                if (!req.file) {
                    console.error('Không có file được upload');
                    reject(new Error('Không có file được upload'));
                    return;
                }

                console.log('Upload ảnh thành công:', req.file.filename);
                const imageUrl = `/assets/img/Products/${req.file.filename}`;
                resolve(imageUrl);
            });
        });
    }
}