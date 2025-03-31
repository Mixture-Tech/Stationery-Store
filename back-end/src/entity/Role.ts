import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("role")
export class Role {
    @PrimaryColumn()
    id_role: number;

    @Column({ length: 50 })
    name: string;
}