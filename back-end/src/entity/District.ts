import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Province } from "./Province";
import { Area } from "./Area";
import { Order } from "./Order";

@Entity("district")
export class District {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @ManyToOne(() => Province, (province) => province.districts, { nullable: false })
    @JoinColumn({ name: "province_id" })
    province: Province;

    @ManyToOne(() => Area, { nullable: false })
    @JoinColumn({ name: "area_id" })
    area: Area;

    @Column({ type: "double" })
    fee: number;

    @OneToMany(() => Order, (order) => order.district)
    orders: Order[];
}
