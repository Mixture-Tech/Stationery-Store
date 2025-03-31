import { DataSource, EntityTarget } from "typeorm";
import { User } from "../entity/User";
import { BaseService } from "./BaseService";
import { UserDTO } from "../dto/userDTO";

export class UserService extends BaseService<User, UserDTO> {
    constructor(entity: EntityTarget<User>, dataSource: DataSource) {
        super(entity, dataSource);
    }

    async findById(id_user: number): Promise<User | null> {
        return this.repository.findOne({ 
            where: { id_user },
            relations: ["role", "orders", "carts"]
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOne({ 
            where: { email },
            relations: ["role"]
        });
    }

    async findByUserName(user_name: string): Promise<User | null> {
        return this.repository.findOne({ 
            where: { user_name },
            relations: ["role"]
        });
    }

    async createUser(userDTO: UserDTO): Promise<User> {
        return this.create(userDTO);
    }

    async updateUser(id_user: number, userDTO: UserDTO): Promise<User | null> {
        return this.update(id_user, userDTO);
    }

    async deleteUser(id_user: number): Promise<boolean> {
        return this.delete(id_user);
    }
}
