import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity("cart")
export class Cart {
    @PrimaryColumn()
    id_product: number;

    @PrimaryColumn()
    id_user: number;

    @Column({ nullable: true })
    quantity: number;

    @Column({ type: "double", nullable: true })
    total_price: number;

    @Column({ type: "bit", width: 1, default: 0 })
    hide: boolean;

    @ManyToOne(() => User)
    @JoinColumn({ name: "id_user" })
    user: User;

    @ManyToOne(() => Product)
    @JoinColumn({ name: "id_product" })
    product: Product;
}