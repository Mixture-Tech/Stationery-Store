import { User } from "../entity/User";
import { UserDTO } from "../dto/userDTO";
import { BaseService } from "./BaseService";
import { AppDataSource } from "../config/database";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class AuthService extends BaseService<User, UserDTO> {
    private static instance: AuthService;

    private constructor(dataSource: any) {
        super(User, dataSource);
    }

    public static async getInstance(): Promise<AuthService> {
        if (!AuthService.instance) {
            const dataSource = await AppDataSource;
            AuthService.instance = new AuthService(dataSource);
        }
        return AuthService.instance;
    }

    async login(email: string, password: string): Promise<{ token: string; user: UserDTO }> {
        const user = await this.repository.findOne({ where: { email } });
        if (!user) {
            throw new Error("User not found");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error("Invalid password");
        }

        const token = jwt.sign(
            { id: user.id_user, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        return {
            token,
            user: {
                id_user: user.id_user,
                user_name: user.user_name,
                email: user.email,
                password: user.password,
                address: user.address,
                avatar: user.avatar,
                id_role: user.id_role,
                hide: user.hide,
                gender: user.gender,
                phone: user.phone,
                role: user.role,
                orders: user.orders,
                carts: user.carts
            }
        };
    }

    async register(userData: UserDTO): Promise<{ token: string; user: UserDTO }> {
        const existingUser = await this.repository.findOne({ where: { email: userData.email } });
        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = this.repository.create({
            ...userData,
            password: hashedPassword
        });

        await this.repository.save(user);

        const token = jwt.sign(
            { id: user.id_user, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        return {
            token,
            user: {
                id_user: user.id_user,
                user_name: user.user_name,
                email: user.email,
                password: user.password,
                address: user.address,
                avatar: user.avatar,
                id_role: user.id_role,
                hide: user.hide,
                gender: user.gender,
                phone: user.phone,
                role: user.role,
                orders: user.orders,
                carts: user.carts
            }
        };
    }

    async changePassword(userId: number, oldPassword: string, newPassword: string): Promise<void> {
        const user = await this.repository.findOne({ where: { id_user: userId } });
        if (!user) {
            throw new Error("User not found");
        }

        const isValidPassword = await bcrypt.compare(oldPassword, user.password);
        if (!isValidPassword) {
            throw new Error("Invalid old password");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await this.repository.save(user);
    }

    async resetPassword(email: string): Promise<void> {
        const user = await this.repository.findOne({ where: { email } });
        if (!user) {
            throw new Error("User not found");
        }

        const newPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await this.repository.save(user);

        // TODO: Send email with new password
    }

    async verifyToken(token: string): Promise<User> {
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
            const user = await this.repository.findOne({ where: { id_user: decoded.id } });
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error) {
            throw new Error("Invalid token");
        }
    }
} 