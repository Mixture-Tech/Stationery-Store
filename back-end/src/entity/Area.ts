import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Province } from "./Province";

@Entity("area")
export class Area {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @OneToMany(() => Province, (province) => province.area)
    provinces: Province[];
    
}
