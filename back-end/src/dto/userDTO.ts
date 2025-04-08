import { Role } from "../entity/Role";
import { Order } from "../entity/Order";
import { Cart } from "../entity/Cart";

export interface UserDTO {
    id_user?: number;
    user_name?: string;
    email?: string;
    password?: string;
    address?: string;
    phone?: string;
    avatar?: string;
    gender?: boolean;
    id_role?: number;
    hide?: boolean;
    role?: any;
    orders?: any[];
    carts?: any[];
}