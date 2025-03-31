import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";

interface JwtPayload {
    id: number;
    email: string;
    role: string;
}

// Mở rộng interface Request để thêm thuộc tính user
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            res.status(401).json({ message: "Token không được cung cấp" });
            return;
        }

        const decoded = new AuthService().verifyToken(token) as JwtPayload;
        req.user = decoded;
        next();
    } catch (error: any) {
        res.status(401).json({ message: error.message });
        return;
    }
}; 