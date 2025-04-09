import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Area } from "./Area";
import { District } from "./District";
import { Order } from "./Order";

@Entity("province")
export class Province {
    @PrimaryColumn()
    id_province: number;

    @Column({ nullable: true })
    name: string;

    @Column({ name: 'id_area' })
    id_area: number;

    @ManyToOne(() => Area, (area) => area.provinces)
    @JoinColumn({ name: 'id_area' })
    area: Area;

    @OneToMany(() => District, (district) => district.province)
    districts: District[];

    @OneToMany(() => Order, (order) => order.province)
    orders: Order[];
}
