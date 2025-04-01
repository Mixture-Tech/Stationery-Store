import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity("cart")
export class Cart {
    @PrimaryColumn()
    id_cart: number;

    @Column()
    id_user: number;

    @Column()
    id_product: number;

    @Column({ nullable: true })
    quantity: number;

    @Column({ type: "bit", width: 1, default: () => "b'0'" })
    hide: boolean;

    @ManyToOne(() => User, (user) => user.carts)
    user: User;

    @ManyToOne(() => Product, (product) => product.carts)
    product: Product;
}