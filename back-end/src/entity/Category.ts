import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category_Parent } from "./Category_Parent";
import { Product } from "./Product";

@Entity("category")
export class Category {
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private name_category: string;

    @Column()
    private link: string;
 
    @Column({ type: "boolean"})
    private hide: boolean;

    @ManyToOne(()=> Category_Parent, (category_parent)=> category_parent.category)
    cateogry_parent: Category_Parent

    @OneToMany(()=> Product, (product)=> product.category)
    product: Product[];

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    private created_at: Date;
    
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    private updated_at: Date;  
}