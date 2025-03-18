import { Entity, Column, Double, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { District } from "./District";
import { Area } from "./Area";
import { Province } from "./Province";
import { Order_Detail } from "./Order_Detail";

@Entity("order")
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "double" })
    total_price: number;

    @Column({ length: 100 })
    status: string;

    @Column({ type: "bit"})
    hide: boolean;

    @Column()
    paymentmethods: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;
    
    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @ManyToOne(()=> User, (user)=> user.orders)
    user: User;

    @ManyToOne(() => District, (district) => district.orders, { nullable: false })
    district: District;

    @ManyToOne(() => Province, { nullable: false })
    @JoinColumn({ name: "province_id" })
    province: Province;

    @ManyToOne(() => Area, { nullable: false })
    @JoinColumn({ name: "area_id" })
    area: Area;

    @OneToMany(() => Order_Detail, (orderDetail) => orderDetail.order)
    orderDetails: Order_Detail[];    

}