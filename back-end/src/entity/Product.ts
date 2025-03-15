import { Column, Entity, PrimaryColumn, OneToMany, ManyToOne } from "typeorm";
import { Order_Detail } from "./Order_Detail";
import { Category } from "./Category";
import { Cart } from "./Cart";

@Entity("Product")
export class Product{
    @PrimaryColumn()
    private id: number;

    @Column()
    private name: string;

    @Column()
    private nums: number;

    @Column({type:"double"})
    private price: number;

    @Column({type:"text"})
    private detail: string;

    @Column()
    private link: string;

    @Column({type:"double"})
    private discount_price: number;

    @Column({type:"text"})
    private description: string;

    @Column()
    private iamge: string;

    @Column()
    private discount: number

    @Column({type:"bit"})
    private hide: boolean;

    @Column()
    private brand: string;

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