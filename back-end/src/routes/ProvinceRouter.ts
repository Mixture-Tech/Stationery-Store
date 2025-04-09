import{ Router } from "express";
import { ProvinceController } from "../controller/ProvinceController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();
const provinceController = new ProvinceController();

// Lấy danh sách tất cả tỉnh/thành phố
router.get("/provinces/get-all", provinceController.getAll);

// Lấy thông tin một tỉnh/thành phố theo ID
router.get("/provinces/:id", provinceController.getById);

// Lấy danh sách tỉnh/thành phố theo khu vực
router.get("/provinces/area/:areaId", provinceController.getByAreaId);

// Tạo tỉnh/thành phố mới (yêu cầu xác thực)
router.post("/provinces/create", authenticateToken, provinceController.create);

// Cập nhật thông tin tỉnh/thành phố (yêu cầu xác thực)
router.put("/provinces/:id", authenticateToken, provinceController.update);

// Xóa tỉnh/thành phố (yêu cầu xác thực)
router.delete("/provinces/:id", authenticateToken, provinceController.delete);

export default router; 