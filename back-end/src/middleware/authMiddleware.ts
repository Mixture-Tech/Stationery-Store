import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";

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

export const authenticateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            res.status(401).json({ message: "Không có token" });
            return;
        }

        const authService = await AuthService.getInstance();
        const user = await authService.verifyToken(token);

        if (!user) {
            res.status(403).json({ message: "Token không hợp lệ" });
            return;
        }

        if (!user.role?.name) {
            res.status(403).json({ message: "Người dùng không có quyền" });
            return;
        }

        req.user = {
            id: user.id_user,
            email: user.email,
            role: user.role.name
        };

        next();
    } catch (error) {
        res.status(403).json({ message: "Token không hợp lệ" });
        return;
    }
}; 