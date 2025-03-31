import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Category_Parent } from "./Category_Parent";
import { Product } from "./Product";

@Entity("category")
export class Category {
    @PrimaryColumn()
    id_category: number;

    @Column({ nullable: true })
    name_category: string;

    @Column({ nullable: true })
    link: string;

    @Column({ type: "bit", width: 1, default: 0 })
    hide: boolean;

    @Column({ nullable: true })
    id_parent: number;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @ManyToOne(() => Category_Parent, (categoryParent) => categoryParent.categories)
    categoryParent: Category_Parent;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}