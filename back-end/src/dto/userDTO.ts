import {IsString, IsEmail} from "class-validator";
import { Role } from "../entity/Role";
import { Order } from "../entity/Order";
import { Cart } from "../entity/Cart";
export class UserDTO {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    hide: boolean;
    gender: boolean;
    role: Role;
    orders: Order[];
    carts: Cart[];
    avatar: string;
}