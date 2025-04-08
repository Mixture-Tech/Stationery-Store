import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn } from "typeorm";
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

    @Column({ default: false })
    hide: boolean;

    @Column({ default: false })
    isEmailVerified: boolean;

    @Column({ type: "bit", width: 1, nullable: true })
    gender: boolean;

    @Column()
    id_role: number;

    @Column({ nullable: true })
    avatar: string;

    @Column({ nullable: true })
    otp: string;

    @Column({ nullable: true })
    otp_expiry: Date;

    @Column({ default: false })
    is_email_verified: boolean;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @DeleteDateColumn()
    delete_at: Date;

    @ManyToOne(() => Role, (role) => role.id_role)
    @JoinColumn({ name: "id_role", referencedColumnName: "id_role" })
    role: Role;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];

    @OneToMany(() => Cart, (cart) => cart.user)
    carts: Cart[];
} 