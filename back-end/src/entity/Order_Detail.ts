import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { Order } from "./Order";
import { District } from "./District";

@Entity("order_detail")
export class Order_Detail {
    @PrimaryColumn()
    id_order_detail: number;

    @Column()
    id_product: number;

    @Column()
    id_order: number;

    @Column()
    id_district: number;

    @Column()
    id_province: number;

    @Column()
    id_area: number;

    @Column({ nullable: true })
    quantity: number;

    @Column({ nullable: true })
    total_product: number;

    @Column({ type: "bit", width: 1, default: () => "b'0'" })
    hide: boolean;

    @ManyToOne(() => Product, (product) => product.orderDetails)
    product: Product;

    @ManyToOne(() => Order, (order) => order.orderDetails)
    order: Order;

    @ManyToOne(() => District, (district) => district.orderDetails)
    district: District;
}