import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { District } from "./District";
import { Order_Detail } from "./Order_Detail";

@Entity("order_table")
export class Order {
    @PrimaryColumn()
    id_order: number;

    @Column({ type: "double" })
    total_price: number;

    @Column({ length: 100, nullable: true })
    status: string;

    @Column()
    id_district: number;

    @Column()
    id_province: number;

    @Column()
    id_area: number;

    @Column({ nullable: true })
    paymentmethods: string;

    @Column()
    id_user: number;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @Column({ type: "bit", width: 1, default: 0 })
    hide: boolean;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @ManyToOne(() => District, (district) => district.orders)
    district: District;

    @OneToMany(() => Order_Detail, (orderDetail) => orderDetail.order)
    orderDetails: Order_Detail[];
}