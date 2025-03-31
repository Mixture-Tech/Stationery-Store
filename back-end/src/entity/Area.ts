import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Province } from "./Province";

@Entity("area")
export class Area {
    @PrimaryColumn()
    id_area: number;

    @Column({ nullable: true })
    name: string;

    @OneToMany(() => Province, (province) => province.area)
    provinces: Province[];
}
