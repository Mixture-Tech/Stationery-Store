import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

export class AreaDTO {
    id: number;
    name: string;
}
