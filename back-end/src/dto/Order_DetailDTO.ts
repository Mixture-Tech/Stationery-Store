import { Entity, ManyToOne, PrimaryColumn, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { District } from "../entity/District";
import { Order } from "../entity/Order";
import { Province } from "../entity/Province";
import { Product } from "../entity/Product";
import { Area } from "../entity/Area";

export class Order_DetailDTO{
    id: number;
    order: Order; 
    district: District;
    province: Province;
    area: Area;
    product: Product;
}