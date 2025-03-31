import{ Router } from "express";
import { AreaController } from "../controller/AreaController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();
const areaController = new AreaController();

// Lấy danh sách tất cả khu vực
router.get("/", areaController.getAll);

// Lấy thông tin một khu vực theo ID
router.get("/:id", areaController.getById);

// Tạo khu vực mới (yêu cầu xác thực)
router.post("/", authenticateToken, areaController.create);

// Cập nhật thông tin khu vực (yêu cầu xác thực)
router.put("/:id", authenticateToken, areaController.update);

// Xóa khu vực (yêu cầu xác thực)
router.delete("/:id", authenticateToken, areaController.delete);

export default router; 