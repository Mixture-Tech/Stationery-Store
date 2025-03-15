import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Category } from "./Category";

@Entity("category_parent")
export class Category_Parent{
    @PrimaryGeneratedColumn()
    private id: number;

    @Column({ type: "varchar", length: 255 })
    private name: string;

    @Column({ type: "varchar", length: 10 })
    private link: string;

    @Column({ type: "bit"})
    private hide: boolean;

    @OneToMany(()=> Category, (category=> category.cateogry_parent))
    category: Category[];

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    private created_at: Date;
    
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    private updated_at: Date;
}