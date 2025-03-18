import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Category } from "./Category";

@Entity("category_parent")
export class Category_Parent{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column({ type: "varchar", length: 10 })
    link: string;

    @Column({ type: "bit"})
    hide: boolean;

    @OneToMany(()=> Category, (category=> category.cateogry_parent))
    category: Category[];

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;
    
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;
}