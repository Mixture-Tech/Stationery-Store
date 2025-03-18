import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category_Parent } from "./Category_Parent";
import { Product } from "./Product";

@Entity("category")
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name_category: string;

    @Column()
    link: string;
 
    @Column({ type: "boolean"})
    hide: boolean;

    @ManyToOne(()=> Category_Parent, (category_parent)=> category_parent.category)
    cateogry_parent: Category_Parent

    @OneToMany(()=> Product, (product)=> product.category)
    product: Product[];

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;
    
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;  
}