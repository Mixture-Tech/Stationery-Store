import { Entity, ManyToOne, PrimaryColumn, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";
import { District } from "./District";
import { Province } from "./Province";
import { Area } from "./Area";
import { Product} from "./Product";

@Entity("order_detail")
export class Order_Detail{
    @PrimaryGeneratedColumn()
    private id: number;

    @ManyToOne(() => Order, (order) => order.orderDetails)
    @JoinColumn({ name: "order_id" })
    order: Order; 

    @ManyToOne(() => District, { nullable: false })
    @JoinColumn({ name: "district_id" })
    district: District;

    @ManyToOne(() => Province, { nullable: false })
    @JoinColumn({ name: "province_id" })
    province: Province;

    @ManyToOne(() => Area, { nullable: false })
    @JoinColumn({ name: "area_id" })
    area: Area;

    @ManyToOne(()=> Product, (product)=> product.order_detail)
    product: Product;
}