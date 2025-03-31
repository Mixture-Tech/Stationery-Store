import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { AppDataSource } from "../config/database";

// Mở rộng interface Request để thêm thuộc tính user
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export const checkRole = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Lấy token từ header
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.status(401).json({ message: "Không tìm thấy token xác thực" });
            }

            // Giải mã token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as any;
            
            // Lấy thông tin user từ database
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({
                where: { id_user: decoded.id },
                relations: ["role"]
            });

            if (!user) {
                return res.status(401).json({ message: "Người dùng không tồn tại" });
            }

            // Kiểm tra role
            if (!roles.includes(user.role.name)) {
                return res.status(403).json({ message: "Bạn không có quyền thực hiện hành động này" });
            }

            // Lưu thông tin user vào request
            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Token không hợp lệ" });
        }
    };
}; 