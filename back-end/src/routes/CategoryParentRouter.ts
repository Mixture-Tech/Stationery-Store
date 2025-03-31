import express from "express";
import { CategoryParentController } from "../controller/CategoryParentController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();
const categoryParentController = new CategoryParentController();

// Lấy danh sách tất cả danh mục cha
router.get("/", categoryParentController.getAll);

// Lấy thông tin một danh mục cha theo ID
router.get("/:id", categoryParentController.getById);

// Tạo danh mục cha mới (yêu cầu xác thực)
router.post("/", authenticateToken, categoryParentController.create);

// Cập nhật thông tin danh mục cha (yêu cầu xác thực)
router.put("/:id", authenticateToken, categoryParentController.update);

// Xóa danh mục cha (yêu cầu xác thực)
router.delete("/:id", authenticateToken, categoryParentController.delete);

export default router; 