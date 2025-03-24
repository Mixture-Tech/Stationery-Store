import { AppDataSource } from "../config/database";
import { User } from "../entity/User";
import { UserDTO } from "../dto/userDTO";
import { Repository } from "typeorm";

export class UserService{
    private userRepository: Repository<User>;
    constructor() {
        AppDataSource.then((dataSource) => {
            this.userRepository = dataSource.getRepository(User);
        }).catch((error) => {
            console.error("Lỗi khi kết nối DB:", error);
        });
    }

    async createUser(userDTO: UserDTO): Promise<User> {
        const user = this.userRepository.create(userDTO);
        return await this.userRepository.save(user);
    }

    async getUserById(id: number): Promise<User | null> {
        return await this.userRepository.findOneBy({id});
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async update(id: number, userDTO: UserDTO): Promise<User | null> {
        const user = await this.userRepository.findOneBy({id});
        if (!user) return null;
        Object.assign(user, userDTO);
        return await this.userRepository.save(user);
    }

    async delete(id: number): Promise<Boolean>{
        const result  = await this.userRepository.delete(id);
        return true;
    }
}
