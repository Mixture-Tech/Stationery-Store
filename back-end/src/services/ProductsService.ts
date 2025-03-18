import { AppDataSource } from "../config/database";
import { Repository } from "typeorm";
import { Product } from "../entity/Product";
import { ProductDTO } from "../dto/ProductDTO";
import { BaseService } from "./BaseService";

export class ProductService extends BaseService<Product, ProductDTO>{
}
