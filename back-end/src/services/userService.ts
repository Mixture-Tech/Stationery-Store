import { AppDataSource } from "../config/database";
import { User } from "../entity/User";
import { UserDTO } from "../dto/userDTO";
import { Repository } from "typeorm";

export class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.initializeRepository();
    }

    private async initializeRepository() {
        try {
            const dataSource = await AppDataSource;
            this.userRepository = dataSource.getRepository(User);
        } catch (error) {
            console.error("Lỗi khi kết nối DB:", error);
            throw error;
        }
    }

    private async ensureRepository() {
        if (!this.userRepository) {
            await this.initializeRepository();
        }
    }

    async createUser(userDTO: UserDTO): Promise<User> {
        await this.ensureRepository();
        const user = this.userRepository.create(userDTO);
        return await this.userRepository.save(user);
    }

    async getUserById(id: number): Promise<User | null> {
        await this.ensureRepository();
        return await this.userRepository.findOneBy({id});
    }

    async getAllUsers(): Promise<User[]> {
        await this.ensureRepository();
        return await this.userRepository.find();
    }

    async update(id: number, userDTO: UserDTO): Promise<User | null> {
        await this.ensureRepository();
        const user = await this.userRepository.findOneBy({id});
        if (!user) return null;
        Object.assign(user, userDTO);
        return await this.userRepository.save(user);
    }

    async delete(id: number): Promise<Boolean> {
        await this.ensureRepository();
        const result = await this.userRepository.delete(id);
        return result.affected ? true : false;
    }
}
