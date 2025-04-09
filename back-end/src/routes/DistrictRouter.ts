import{ Router } from "express";
import { DistrictController } from "../controller/DistrictController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();
const districtController = new DistrictController();

// Lấy danh sách tất cả quận/huyện
router.get("/districts/get-all", districtController.getAll);

// Lấy thông tin một quận/huyện theo ID
router.get("/districts/:id", districtController.getById);

// Lấy danh sách quận/huyện theo tỉnh/thành phố
router.get("/districts/province/:provinceId", districtController.getByProvinceId);

// Tạo quận/huyện mới (yêu cầu xác thực)
router.post("/districts/create", authenticateToken, districtController.create);

// Cập nhật thông tin quận/huyện (yêu cầu xác thực)
router.put("/districts/:id", authenticateToken, districtController.update);

// Xóa quận/huyện (yêu cầu xác thực)
router.delete("/districts/:id", authenticateToken, districtController.delete);

export default router; 