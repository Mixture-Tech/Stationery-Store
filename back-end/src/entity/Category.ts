import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Category_Parent } from "./Category_Parent";
import { Product } from "./Product";

@Entity("category")
export class Category {
    @PrimaryColumn({ name: "id_category" })
    id_category: number;

    @Column({ name: "name_category" })
    name_category: string;

    @Column({ nullable: true })
    link: string;

    @Column({ type: "bit", width: 1, default: 0 })
    hide: boolean;

    @Column({ name: "id_parent", nullable: true })
    id_parent: number;

    @CreateDateColumn({ name: "create_at" })
    create_at: Date;

    @UpdateDateColumn({ name: "update_at" })
    update_at: Date;

    @ManyToOne(() => Category_Parent, (categoryParent) => categoryParent.categories)
    @JoinColumn({ name: "id_parent", referencedColumnName: "id_parent" })
    categoryParent: Category_Parent;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}