import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { Role } from "./Role";
import { Order } from "./Order";
import { Cart } from "./Cart";

@Entity("user")
export class User {
    @PrimaryColumn()
    id_user: number;

    @Column()
    user_name: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    address: string;

    @Column({ length: 10, nullable: true })
    phone: string;

    @Column({ type: "bit", width: 1, default: 0 })
    hide: boolean;

    @Column({ type: "bit", width: 1, nullable: true })
    gender: boolean;

    @Column()
    id_role: number;

    @Column({ nullable: true })
    avatar: string;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @DeleteDateColumn()
    delete_at: Date;

    @ManyToOne(() => Role, (role) => role.id_role)
    role: Role;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];

    @OneToMany(() => Cart, (cart) => cart.user)
    carts: Cart[];
} 