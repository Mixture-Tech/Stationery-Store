import { Column, Entity, PrimaryColumn, OneToMany, ManyToOne } from "typeorm";
import { Category } from "../entity/Category";

export class ProductDTO{
    id: number;
    name: string;
    nums: number;
    price: number;
    detail: string;
    link: string;
    discount_price: number;
    description: string;
    image: string;
    discount: number
    hide: boolean;
    brand: string;
    created_at: Date;
    category: Category;

}