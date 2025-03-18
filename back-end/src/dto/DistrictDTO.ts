import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Province } from "../entity/Province";
import { Area } from "../entity/Area";
import { Order } from "../entity/Order";

export class DistrictDTO {
    id_district: number;
    name: string;
    province: Province;
    area: Area;
    fee: number;
    orders: Order[];
}
