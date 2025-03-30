import { AppDataSource } from "../config/database";
import { Repository } from "typeorm";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserDTO } from "../dto/userDTO";

export class AuthService {
    private userRepository: Repository<User>;
    private readonly JWT_SECRET = process.env.JWT_SECRET || "Mixture-Tech";
    private readonly JWT_EXPIRES_IN = "24h";

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

    async register(userDTO: UserDTO): Promise<{ user: User; token: string }> {
        await this.ensureRepository();
        
        // Kiểm tra email đã tồn tại chưa
        const existingUser = await this.userRepository.findOne({
            where: { email: userDTO.email }
        });
        
        if (existingUser) {
            throw new Error("Email đã được sử dụng");
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(userDTO.password, 10);
        
        // Tạo user mới
        const user = this.userRepository.create({
            ...userDTO,
            password: hashedPassword
        });

        // Lưu user vào database
        const savedUser = await this.userRepository.save(user);

        // Tạo JWT token
        const token = this.generateToken(savedUser);

        return {
            user: savedUser,
            token
        };
    }

    async login(email: string, password: string): Promise<{ user: User; token: string }> {
        await this.ensureRepository();

        // Tìm user theo email
        const user = await this.userRepository.findOne({
            where: { email }
        });

        if (!user) {
            throw new Error("Email hoặc mật khẩu không chính xác");
        }

        // Kiểm tra mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Email hoặc mật khẩu không chính xác");
        }

        // Tạo JWT token
        const token = this.generateToken(user);

        return {
            user,
            token
        };
    }

    async logout(token: string): Promise<void> {
        // Trong trường hợp này, chúng ta chỉ cần xác thực token
        // Nếu bạn muốn implement blacklist token, bạn có thể thêm logic ở đây
        try {
            jwt.verify(token, this.JWT_SECRET);
        } catch (error) {
            throw new Error("Token không hợp lệ");
        }
    }

    private generateToken(user: User): string {
        return jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            this.JWT_SECRET,
            { expiresIn: this.JWT_EXPIRES_IN }
        );
    }

    verifyToken(token: string): any {
        try {
            return jwt.verify(token, this.JWT_SECRET);
        } catch (error) {
            throw new Error("Token không hợp lệ hoặc đã hết hạn");
        }
    }
} 