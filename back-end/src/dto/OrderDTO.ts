import { Entity, Column, Double, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../entity/User";
import { District } from "../entity/District";
import { Province } from "../entity/Province";
import { Area } from "../entity/Area";

export interface OrderDTO {
    id_user: number;
    id_province: number;
    id_district: number;
    area: string;
    phone: string;
    delivery_fee: number;
    total_price: number;
    products: {
        id_product: number;
        quantity: number;
        price: number;
    }[];
}