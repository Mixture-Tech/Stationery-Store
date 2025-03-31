import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { AuthService } from "../services/AuthService";
import { UserDTO } from "../dto/userDTO";

export class UserController {
    private userService: UserService;
    private authService: AuthService;

    constructor() {
        this.initialize();
    }

    private async initialize() {
        this.userService = await UserService.getInstance();
        this.authService = await AuthService.getInstance();
    }

    async getAll(req: Request, res: Response) {
        try {
            const users = await this.userService.getAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: "Error getting users", error });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const user = await this.userService.getById(id);
            if (!user) {
                return res.status(404).json({
                    message: "Không tìm thấy người dùng",
                    status: 404,
                });
            }
            return res.status(200).json({
                message: "Lấy thông tin người dùng thành công",
                status: 200,
                data: user,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Lỗi server",
                status: 500,
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const userData: UserDTO = req.body;
            const user = await this.userService.create(userData);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: "Error creating user", error });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const userData = req.body;
            const updatedUser = await this.userService.update(id, userData);
            if (!updatedUser) {
                return res.status(404).json({
                    message: "Không tìm thấy người dùng",
                    status: 404,
                });
            }
            return res.status(200).json({
                message: "Cập nhật thành công",
                status: 200,
                data: updatedUser,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Lỗi server",
                status: 500,
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const result = await this.userService.delete(id);
            if (!result) {
                return res.status(404).json({
                    message: "Không tìm thấy người dùng",
                    status: 404,
                });
            }
            return res.status(200).json({
                message: "Xóa thành công",
                status: 200,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Lỗi server",
                status: 500,
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login(email, password);
            res.json(result);
        } catch (error) {
            res.status(401).json({ message: "Invalid credentials", error });
        }
    }

    async register(req: Request, res: Response) {
        try {
            const userData: UserDTO = req.body;
            const result = await this.authService.register(userData);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: "Error registering user", error });
        }
    }

    async changePassword(req: Request, res: Response) {
        try {
            const { oldPassword, newPassword } = req.body;
            const userId = Number(req.params.id);
            await this.authService.changePassword(userId, oldPassword, newPassword);
            res.json({ message: "Password changed successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error changing password", error });
        }
    }

    async resetPassword(req: Request, res: Response) {
        try {
            const { email } = req.body;
            await this.authService.resetPassword(email);
            res.json({ message: "Password reset successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error resetting password", error });
        }
    }
}