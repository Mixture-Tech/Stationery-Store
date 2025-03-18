import { Column, Entity, PrimaryColumn, OneToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order_Detail } from "./Order_Detail";
import { Category } from "./Category";
import { Cart } from "./Cart";

@Entity("Product")
export class Product{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    nums: number;

    @Column({type:"double"})
    price: number;

    @Column({type:"text"})
    detail: string;

    @Column()
    link: string;

    @Column({type:"double"})
    discount_price: number;

    @Column({type:"text"})
    description: string;

    @Column({ nullable: true })
    image: string;    

    @Column()
    discount: number

    @Column({type:"bit"})
    hide: boolean;

    @Column()
    brand: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;
    
    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @OneToMany(()=> Order_Detail, (order_detail)=> order_detail.product)
    order_detail: Order_Detail[];

    @ManyToOne(()=> Category, (category) => category.product)
    category: Category;

    @OneToMany(() => Cart, (cart) => cart.product)
    carts: Cart[];

}