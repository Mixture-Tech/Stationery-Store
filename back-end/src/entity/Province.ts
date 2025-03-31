import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Area } from "./Area";
import { District } from "./District";

@Entity("province")
export class Province {
    @PrimaryColumn()
    id_province: number;

    @Column({ nullable: true })
    name: string;

    @Column()
    id_area: number;

    @ManyToOne(() => Area, (area) => area.provinces)
    area: Area;

    @OneToMany(() => District, (district) => district.province)
    districts: District[];
}
