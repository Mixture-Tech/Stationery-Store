import { User } from "../entity/User";
import { UserDTO } from "../dto/userDTO";
import { BaseService } from "./BaseService";
import { AppDataSource } from "../config/database";

export class UserService extends BaseService<User, UserDTO> {
    private static instance: UserService;

    private constructor(dataSource: any) {
        super(User, dataSource);
    }

    public static async getInstance(): Promise<UserService> {
        if (!UserService.instance) {
            const dataSource = await AppDataSource;
            UserService.instance = new UserService(dataSource);
        }
        return UserService.instance;
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
