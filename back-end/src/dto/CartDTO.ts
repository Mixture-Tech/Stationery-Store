import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "../entity/Product";
import { User } from "../entity/User";

export class Cart {
    id: number;
    product: Product;
    user: User;
    quantity: number;
    total_price: number;
    hide: boolean;
}