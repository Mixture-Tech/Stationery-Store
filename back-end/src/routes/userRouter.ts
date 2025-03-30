import { Router } from "express";
import { UserController } from "../controller/userController";
import { ApiPath } from "../const/ApiPath";

const router = Router();

/**
 * @swagger
 * /api/v1/create-user:
 *   post:
 *     summary: Tạo một user mới
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserDTO'
 *     responses:
 *       201:
 *         description: Trả về thông tin user vừa được tạo
 */
router.post(ApiPath.CREATE_USER, UserController.createUser);

/**
 * @swagger
 * /api/v1/get-all-users:
 *   get:
 *     summary: Lấy danh sách tất cả user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Trả về danh sách user
 */
router.get(ApiPath.GET_ALL_USERS, UserController.getAllUsers);

/**
 * @swagger
 * /api/v1/get-user-by-id/{id}:
 *   get:
 *     summary: Lấy thông tin một user theo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID của user
 *     responses:
 *       200:
 *         description: Trả về thông tin user
 *       404:
 *         description: User không tồn tại
 */
router.get(ApiPath.GET_USER_BY_ID, UserController.getUserById);

/**
 * @swagger
 * /api/v1/update-user/{id}:
 *   put:
 *     summary: Cập nhật thông tin user theo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID của user cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserDTO'
 *     responses:
 *       200:
 *         description: Trả về thông tin user đã được cập nhật
 *       404:
 *         description: User không tồn tại
 */
router.put(ApiPath.UPDATE_USER, UserController.updateUser);

/**
 * @swagger
 * /api/v1/delete-user/{id}:
 *   delete:
 *     summary: Xóa một user theo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID của user cần xóa
 *     responses:
 *       200:
 *         description: Trả về trạng thái xóa user
 *       404:
 *         description: User không tồn tại
 */
router.delete(ApiPath.DELETE_USER, UserController.deleteUser);

export default router;
