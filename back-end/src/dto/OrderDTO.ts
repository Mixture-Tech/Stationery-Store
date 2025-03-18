import { Entity, Column, Double, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../entity/User";
import { District } from "../entity/District";
import { Province } from "../entity/Province";
import { Area } from "../entity/Area";

export class OrderDTO {
    id: number;
    total_price: number;
    status: string;
    hide: boolean;
    paymentmethods: string;
    created_at: Date;
    user: User;
    district: District;
    province: Province;
    area: Area;
}