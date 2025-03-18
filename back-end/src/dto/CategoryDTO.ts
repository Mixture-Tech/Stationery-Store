import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category_Parent } from "../entity/Category_Parent";

export class CategoryDTO {
    id: number;
    name_category: string;
    link: string;
    hide: boolean;
    cateogry_parent: Category_Parent
    created_at: Date;
    updated_at: Date;  
}