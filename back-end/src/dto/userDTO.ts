import { Role } from "../entity/Role";
import { Order } from "../entity/Order";
import { Cart } from "../entity/Cart";

export class UserDTO {
    id_user?: number;
    user_name: string;
    email: string;
    password: string;
    address?: string;
    avatar?: string;
    id_role?: number;
    hide?: boolean;
    gender?: boolean;
    phone: string;
    role: Role;
    orders: Order[];
    carts: Cart[];
}