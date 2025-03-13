import {Router} from "express";
import {UserController} from "../controller/userController";
import { ApiPath } from "../const/ApiPath";

const router = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: tạo 1 user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Trả về thông tin user đã thêm vào
 */
router.post(ApiPath.CREATE_USER, UserController.createUser);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: chỉnh sửa thông tin người dùng 
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Trả về thông tin user đã chỉnh sửa
 */
router.post(ApiPath.UPDATE_USER, UserController.updateUser);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lấy danh sách user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Trả về danh sách user
 */
router.get(ApiPath.GET_ALL_USERS, UserController.getAllUsers);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: xóa 1 user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Trả về thông tin user đã xóa
 */
router.post(ApiPath.DELETE_USER, UserController.deleteUser);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lấy thông tin 1 user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Trả về thông tin 1 user
 */
router.post(ApiPath.GET_USER_BY_ID, UserController.getUserById);


export default router;