import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './Order';
import { Product } from './Product';
import { District } from "./District";

@Entity('order_detail')
export class Order_Detail {
    @PrimaryGeneratedColumn()
    id_order_detail: number;

    @Column()
    id_order: number;

    @Column()
    id_product: number;

    @Column()
    quantity: number;

    @Column()
    total_product: number;

    @Column({ type: "bit", width: 1, default: () => "b'0'" })
    hide: boolean;

    @ManyToOne(() => Order, order => order.orderDetails)
    @JoinColumn({ name: 'id_order' })
    order: Order;

    @ManyToOne(() => Product, product => product.orderDetails)
    @JoinColumn({ name: 'id_product' })
    product: Product;

    @ManyToOne(() => District, (district) => district.orderDetails)
    @JoinColumn({ name: 'id_district' })
    district: District;
}