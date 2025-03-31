import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Province } from "./Province";
import { Order } from "./Order";
import { Order_Detail } from "./Order_Detail";

@Entity("district")
export class District {
    @PrimaryColumn()
    id_district: number;

    @Column({ nullable: true })
    name: string;

    @Column()
    id_province: number;

    @Column({ type: "double", nullable: true })
    fee: number;

    @ManyToOne(() => Province, (province) => province.districts)
    province: Province;

    @OneToMany(() => Order, (order) => order.district)
    orders: Order[];

    @OneToMany(() => Order_Detail, (orderDetail) => orderDetail.district)
    orderDetails: Order_Detail[];
}
ư