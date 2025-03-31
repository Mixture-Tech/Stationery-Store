import express from "express";
import { CategoryController } from "../controller/CategoryController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();
const categoryController = new CategoryController();

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Lấy danh sách tất cả danh mục
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Trả về danh sách danh mục
 */
router.get("/categories", categoryController.getAll);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     summary: Lấy thông tin một danh mục theo ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID của danh mục cần lấy thông tin
 *     responses:
 *       200:
 *         description: Trả về thông tin danh mục
 *       404:
 *         description: Danh mục không tồn tại
 */
router.get("/categories/:id", categoryController.getById);

/**
 * @swagger
 * /api/v1/categories/parent/{parentId}:
 *   get:
 *     summary: Lấy danh sách danh mục con theo ID danh mục cha
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: parentId
 *         required: true
 *         schema:
 *           type: number
 *         description: ID của danh mục cha
 *     responses:
 *       200:
 *         description: Trả về danh sách danh mục con
 */
router.get("/categories/parent/:parentId", categoryController.getByParentId);

/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     summary: Tạo mới một danh mục
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryDTO'
 *     responses:
 *       201:
 *         description: Trả về thông tin danh mục vừa được tạo
 */
router.post("/categories", authenticateToken, categoryController.create);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   put:
 *     summary: Cập nhật thông tin của danh mục theo ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID của danh mục cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryDTO'
 *     responses:
 *       200:
 *         description: Trả về thông tin danh mục đã được cập nhật
 *       404:
 *         description: Danh mục không tồn tại
 */
router.put("/categories/:id", authenticateToken, categoryController.update);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   delete:
 *     summary: Xóa danh mục theo ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID của danh mục cần xóa
 *     responses:
 *       200:
 *         description: Thông báo xóa danh mục thành công
 *       404:
 *         description: Danh mục không tồn tại
 */
router.delete("/categories/:id", authenticateToken, categoryController.delete);

export default router; 