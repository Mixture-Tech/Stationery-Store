import express from "express";
import { DistrictController } from "../controller/DistrictController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();
const districtController = new DistrictController();

// Lấy danh sách tất cả quận/huyện
router.get("/", districtController.getAll);

// Lấy thông tin một quận/huyện theo ID
router.get("/:id", districtController.getById);

// Lấy danh sách quận/huyện theo tỉnh/thành phố
router.get("/province/:provinceId", districtController.getByProvinceId);

// Tạo quận/huyện mới (yêu cầu xác thực)
router.post("/", authenticateToken, districtController.create);

// Cập nhật thông tin quận/huyện (yêu cầu xác thực)
router.put("/:id", authenticateToken, districtController.update);

// Xóa quận/huyện (yêu cầu xác thực)
router.delete("/:id", authenticateToken, districtController.delete);

export default router; 