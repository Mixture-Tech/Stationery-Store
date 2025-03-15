import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, PrimaryColumn } from "typeorm";
import { Area } from "./Area";
import { District } from "./District";

@Entity("province")
export class Province {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @ManyToOne(() => Area, (area) => area.provinces)
    @JoinColumn({ name: "id" }) 
    area: Area;

    @OneToMany(() => District, (district) => district.province)
    districts: District[];
}
