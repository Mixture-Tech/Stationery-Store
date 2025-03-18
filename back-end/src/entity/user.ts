import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Role } from "./Role";
import { Order } from "./Order";
import { Cart } from "./Cart";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255, unique: true })
    email: string;

    @Column({ length: 255 })
    password: string;

    @Column({ length: 255, nullable: true })
    address: string;

    @Column({ type: "char", length: 10, nullable: true })
    phone: string;

    @Column({ type: "bit"})
    hide: boolean;

    @Column({ type: "bit", nullable: true })
    gender: boolean;

    @ManyToOne(() => Role, (role) => role.users, { nullable: false })
    role: Role;

    @OneToMany(() => Order, (order)=> order.user, { nullable: false })
    orders: Order[];

    @OneToMany(() => Cart, (cart)=> cart.user, { nullable: false })
    carts: Cart[];

    @Column({ length: 255, nullable: true })
    avatar: string;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @Column({ type: "datetime", nullable: true })
    delete_at: Date;
}