import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { AppDataSource } from "../config/database";

const JWT_SECRET = "Mixture-Tech";
const JWT_EXPIRES_IN = "24h";

interface JwtPayload {
    id_user: number;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
                role: string;
            };
        }
    }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            res.status(401).json({
                success: false,
                message: "Không tìm thấy token"
            });
            return;
        }

        const parts = authHeader.split(" ");
        if (parts.length !== 2 || parts[0] !== "Bearer") {
            res.status(401).json({
                success: false,
                message: "Token không hợp lệ"
            });
            return;
        }

        const token = parts[1];
        console.log("Token received:", token);
        console.log("JWT_SECRET:", JWT_SECRET);
        try {
            console.log("Verifying token...");
            const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
            console.log("Decoded token:", decoded);
            
            // Kiểm tra user có tồn tại không
            const userRepository = (await AppDataSource).getRepository(User);
            const user = await userRepository.findOne({ where: { id_user: decoded.id_user } });

            if (!user) {
                res.status(401).json({
                    success: false,
                    message: "Người dùng không tồn tại"
                });
                return;
            }

            // Lưu thông tin user vào request để sử dụng ở các middleware sau
            req.user = {
                id: user.id_user,
                email: user.email,
                role: user.role?.name || "user"
            };

            next();
        } catch (error: any) {
            console.log("Token verification error:", error);
            if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
                res.status(401).json({
                    success: false,
                    message: "Token không hợp lệ hoặc đã hết hạn"
                });
            } else {
                console.log("Other Error:", error);
                res.status(500).json({
                    success: false,
                    message: "Lỗi xác thực token"
                });
            }
        }
    } catch (error: any) {
        console.log("Outer Error:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi xác thực"
        });
    }
}; 