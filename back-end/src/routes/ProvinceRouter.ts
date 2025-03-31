import{ Router } from "express";
import { ProvinceController } from "../controller/ProvinceController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();
const provinceController = new ProvinceController();

// Lấy danh sách tất cả tỉnh/thành phố
router.get("/", provinceController.getAll);

// Lấy thông tin một tỉnh/thành phố theo ID
router.get("/:id", provinceController.getById);

// Lấy danh sách tỉnh/thành phố theo khu vực
router.get("/area/:areaId", provinceController.getByAreaId);

// Tạo tỉnh/thành phố mới (yêu cầu xác thực)
router.post("/", authenticateToken, provinceController.create);

// Cập nhật thông tin tỉnh/thành phố (yêu cầu xác thực)
router.put("/:id", authenticateToken, provinceController.update);

// Xóa tỉnh/thành phố (yêu cầu xác thực)
router.delete("/:id", authenticateToken, provinceController.delete);

export default router; 