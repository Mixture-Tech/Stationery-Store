import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { UserDTO } from "../dto/userDTO";

export class AuthController {
    static async register(req: Request, res: Response): Promise<void> {
        try {
            const userDTO: UserDTO = req.body;
            const { user, token } = await new AuthService().register(userDTO);
            
            res.status(201).json({
                message: "Đăng ký thành công",
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                token
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            
            if (!email || !password) {
                res.status(400).json({ message: "Email và mật khẩu là bắt buộc" });
                return;
            }

            const { user, token } = await new AuthService().login(email, password);
            
            res.status(200).json({
                message: "Đăng nhập thành công",
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                token
            });
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    }

    static async logout(req: Request, res: Response): Promise<void> {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            
            if (!token) {
                res.status(401).json({ message: "Token không được cung cấp" });
                return;
            }

            await new AuthService().logout(token);
            res.status(200).json({ message: "Đăng xuất thành công" });
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    }
} 