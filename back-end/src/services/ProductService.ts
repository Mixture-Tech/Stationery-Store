import { Repository, DataSource, EntityTarget, Like } from "typeorm";
import { Product } from "../entity/Product";
import { BaseService } from "./BaseService";
import { ProductDTO } from "../dto/ProductDTO";
import { Request, NextFunction } from 'express';
import { uploadConfig } from "../config/uploadImg";
import { Category } from "../entity/Category";
import { MulterRequest } from '../types/multer';


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
        try {
            // Tìm entity theo id_product
            const entity = await this.repository.findOneBy({ id_product });
            if (!entity) {
                console.log(`Không tìm thấy sản phẩm với id_product: ${id_product}`);
                return null;
            }
    
            // Chuẩn hóa DTO để khớp với entity Product
            const sanitizedDTO = {
                name: productDTO.name ?? entity.name,
                nums: productDTO.nums !== undefined ? Number(productDTO.nums) : entity.nums,
                price: productDTO.price !== undefined ? Number(productDTO.price) : entity.price,
                detail: productDTO.detail ?? entity.detail,
                brand: productDTO.brand ?? entity.brand,
                link: productDTO.link ?? entity.link,
                discount_price: productDTO.discount_price !== undefined ? (Number(productDTO.price) - (Number(productDTO.price) * (Number(productDTO.discount) / 100))) : entity.discount_price,
                description: productDTO.description ?? entity.description,
                image: productDTO.image ?? entity.image,
                discount: productDTO.discount !== undefined ? Number(productDTO.discount) : entity.discount,
                hide: productDTO.hide !== undefined ? (Number(productDTO.hide) === 1 || productDTO.hide === true) : (Number(productDTO.hide) === 0 || productDTO.hide === false),
                id_category: productDTO.category && productDTO.category.id_category 
                    ? Number(productDTO.category.id_category) 
                    : entity.id_category, // Sử dụng id_category hiện tại nếu category không tồn tại
            };
    
            console.log('Sanitized DTO:', sanitizedDTO); // Log để debug
    
            // Gán dữ liệu từ DTO vào entity
            Object.assign(entity, sanitizedDTO);
    
            // Lưu entity đã cập nhật
            const updatedEntity = await this.repository.save(entity);
            console.log('Entity sau khi cập nhật:', updatedEntity);
    
            return updatedEntity;
        } catch (error) {
            console.error('Lỗi trong ProductService.updateProduct:', error);
            throw error; // Ném lỗi để ProductController xử lý
        }
    }

    async deleteProduct(id_product: number): Promise<boolean> {
        return this.delete(id_product);
    }

    async hideProduct(id_product: number): Promise<any> {
        return this.repository.update(id_product, { hide: true });
    }

    async uploadImage(req: MulterRequest): Promise<string> {
        console.log('Bắt đầu upload ảnh...');
        return new Promise((resolve, reject) => {
            this.uploadMiddleware(req, null as any, (error: any) => {
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