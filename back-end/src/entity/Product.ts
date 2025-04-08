import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Category } from "./Category";
import { Order_Detail } from "./Order_Detail";
import { Cart } from "./Cart";

@Entity("product")
export class Product {
    @PrimaryGeneratedColumn()
    id_product: number;

    @Column()
    id_category: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    nums: number;

    @Column({ type: "decimal", precision: 10, scale: 3, nullable: true })
    price: number;

    @Column({ type: "text", nullable: true })
    detail: string;

    @Column({ nullable: true })
    brand: string;

    @Column({ nullable: true })
    link: string;

    @Column({ type: "decimal", precision: 10, scale: 3, nullable: true })
    discount_price: number;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @Column({ type: "text", nullable: true })
    description: string;

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: true })
    discount: number;

    @Column({
        type: "bit",
        width: 1,
        default: () => "b'0'",
        transformer: {
          to: (value: boolean) => value ? 1 : 0, // Khi lưu vào DB
          from: (value: Buffer) => value[0] === 1, // Khi lấy từ DB
        },
      })
    hide: boolean;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: "id_category", referencedColumnName: "id_category" })
    category: Category;

    @OneToMany(() => Order_Detail, (orderDetail) => orderDetail.product)
    orderDetails: Order_Detail[];

    @OneToMany(() => Cart, (cart) => cart.product)
    carts: Cart[];
}