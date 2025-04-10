import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { UserDTO } from "../dto/userDTO";

export class AuthController {
    static async register(req: Request, res: Response): Promise<void> {
        try {
            const userDTO: UserDTO = req.body;
            const authService = await AuthService.getInstance();
            const { user } = await authService.register(userDTO);
            
            res.status(201).json({
                message: "Vui lòng kiểm tra email để xác thực tài khoản",
                user: {
                    email: user.email
                }
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

            const authService = await AuthService.getInstance();
            const { user, token } = await authService.login(email, password);
            
            res.status(200).json({
                message: "Đăng nhập thành công",
                user: {
                    id_user: user.id_user,
                    email: user.email,
                    role: user.role
                },
                token
            });
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    }

    static async verifyOTP(req: Request, res: Response): Promise<void> {
        console.log("Request body:", req.body);
        console.log("Request headers:", req.headers);
        try {
            const { email, otp } = req.body;
            
            if (!email || !otp) {
                console.log("Thiếu dữ liệu:", { email, otp });
                res.status(400).json({ message: "Email và mã OTP là bắt buộc" });
                return;
            }

            const authService = await AuthService.getInstance();
            await authService.verifyOTP(email, otp);
            
            res.status(200).json({
                message: "Xác thực email thành công"
            });
        } catch (error: any) {
            console.log("Lỗi:", error);
            res.status(400).json({ message: error.message });
        }
    }

    static async logout(req: Request, res: Response): Promise<void> {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            
            if (!token) {
                res.status(401).json({ message: "Token không được cung cấp" });
                return;
            }

            const authService = await AuthService.getInstance();
            await authService.logout(token);
            res.status(200).json({ message: "Đăng xuất thành công" });
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    }

    static async googleLogin(req: Request, res: Response): Promise<void> {
        try {
            const authService = await AuthService.getInstance();
            const googleAuthUrl = authService.getGoogleAuthURL();
            res.status(200).json({ url: googleAuthUrl });
        } catch (error: any) {
            res.status(500).json({ message: "Lỗi khi tạo URL đăng nhập Google" });
        }
    }

    static async googleCallback(req: Request, res: Response): Promise<void> {
        try {
            const { code } = req.query;
            if (!code || typeof code !== "string") {
                res.status(400).json({ message: "Code không hợp lệ" });
                return;
            }

            const authService = await AuthService.getInstance();
            const { user, token } = await authService.googleLogin(code);
            
            // res.redirect(`http://localhost:3000/auth-callback?token=${token}&userId=${user.id_user}`);

            // res.status(200).json({
            //     message: "Đăng nhập bằng Google thành công",
            //     user: {
            //         id_user: user.id_user,
            //         email: user.email,
            //         role: user.role,
            //     },
            //     token,
            // });
            res.redirect(`http://localhost:5173?token=${token}&userId=${user.id_user}`);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
} 