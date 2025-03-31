import { Entity, PrimaryColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./Category";

@Entity("category_parent")
export class Category_Parent {
    @PrimaryColumn()
    id_parent: number;

    @Column({ nullable: true })
    name_parent: string;

    @Column({ length: 20, nullable: true })
    link: string;

    @Column({ type: "bit", width: 1, default: 0 })
    hide: boolean;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @OneToMany(() => Category, (category) => category.categoryParent)
    categories: Category[];
}