import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("role")
export class Role{
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private name: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}