import express from "express";
import { UserController } from "../controller/userController";
import { authenticateToken } from "../middleware/authMiddleware";
import { ApiPath } from "../const/ApiPath";

const router = express.Router();
const userController = new UserController();

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Tạo mới một người dùng
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserDTO'
 *     responses:
 *       201:
 *         description: Trả về thông tin người dùng vừa được tạo
 */
router.post("/users", authenticateToken, userController.createUser);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Trả về danh sách người dùng
 */
router.get("/users", authenticateToken, userController.getAllUsers);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Lấy thông tin một người dùng theo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID của người dùng cần lấy thông tin
 *     responses:
 *       200:
 *         description: Trả về thông tin người dùng
 *       404:
 *         description: Người dùng không tồn tại
 */
router.get("/users/:id", authenticateToken, userController.getUserById);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Cập nhật thông tin của người dùng theo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID của người dùng cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserDTO'
 *     responses:
 *       200:
 *         description: Trả về thông tin người dùng đã được cập nhật
 *       404:
 *         description: Người dùng không tồn tại
 */
router.put("/users/:id", authenticateToken, userController.updateUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Xóa người dùng theo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID của người dùng cần xóa
 *     responses:
 *       200:
 *         description: Thông báo xóa người dùng thành công
 *       404:
 *         description: Người dùng không tồn tại
 */
router.delete("/users/:id", authenticateToken, userController.deleteUser);

export default router;

