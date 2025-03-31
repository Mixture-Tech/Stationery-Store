import { Router } from "express";
import { CategoryParentController } from "../controller/CategoryParentController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();
const categoryParentController = new CategoryParentController();

// Public routes
router.get("/category-parent", categoryParentController.getAll);
router.get("/category-parent/:id", categoryParentController.getById);

// Protected routes (yêu cầu xác thực)
router.post("/category-parent", authenticateToken, categoryParentController.create);
router.put("/category-parent/:id", authenticateToken, categoryParentController.update);
router.delete("/category-parent/:id", authenticateToken, categoryParentController.delete);

// Route lấy danh sách category con theo parent ID
router.get("/:id/categories", categoryParentController.getCategoriesByParentId);

export default router; 