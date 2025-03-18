import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

export class Category_ParentDTO{
    id: number;
    name: string;
    link: string;
    hide: boolean;
    created_at: Date;
    updated_at: Date;
}