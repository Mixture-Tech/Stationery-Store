import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, (product) => product.carts)
    product: Product;

    @ManyToOne(() => User, (user) => user.carts)
    user: User;

    @Column({ type: "int", nullable: false })
    quantity: number;

    @Column({ type: "double", nullable: false })
    total_price: number;

    @Column({ type: "boolean", default: false })
    hide: boolean;
}