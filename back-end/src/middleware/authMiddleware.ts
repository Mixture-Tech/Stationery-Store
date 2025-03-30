import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Token không được cung cấp" });
        }

        const decoded = new AuthService().verifyToken(token);
        req.user = decoded;
        next();
    } catch (error: any) {
        return res.status(401).json({ message: error.message });
    }
}; 