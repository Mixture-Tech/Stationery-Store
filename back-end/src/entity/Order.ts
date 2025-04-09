import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './User';
import { Province } from './Province';
import { District } from './District';
import { Order_Detail } from './Order_Detail';

@Entity('order_table')
export class Order {
    @PrimaryGeneratedColumn()
    id_order: number;

    @Column()
    id_user: number;

    @Column()
    id_province: number;

    @Column()
    id_district: number;

    @Column()
    area: string;

    @Column()
    phone: string;

    @Column()
    delivery_fee: number;

    @Column()
    total_price: number;

    @Column({ default: 'pending' })
    status: string;

    @ManyToOne(() => User, user => user.orders)
    @JoinColumn({ name: 'id_user' })
    user: User;

    @ManyToOne(() => Province, province => province.orders)
    @JoinColumn({ name: 'id_province' })
    province: Province;

    @ManyToOne(() => District, district => district.orders)
    @JoinColumn({ name: 'id_district' })
    district: District;

    @OneToMany(() => Order_Detail, orderDetail => orderDetail.order)
    orderDetails: Order_Detail[];
}