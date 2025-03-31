import express from "express";
import { OrderController } from "../controller/OrderController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();
const orderController = new OrderController();

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Lấy danh sách tất cả đơn hàng
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Trả về danh sách đơn hàng
 */
router.get("/orders", authenticateToken, orderController.getAll);

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   get:
 *     summary: Lấy thông tin một đơn hàng theo ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID của đơn hàng cần lấy thông tin
 *     responses:
 *       200:
 *         description: Trả về thông tin đơn hàng
 *       404:
 *         description: Đơn hàng không tồn tại
 */
router.get("/orders/:id", authenticateToken, orderController.getById);

/**
 * @swagger
 * /api/v1/orders/user/{userId}:
 *   get:
 *     summary: Lấy danh sách đơn hàng của người dùng
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *         description: ID của người dùng
 *     responses:
 *       200:
 *         description: Trả về danh sách đơn hàng của người dùng
 */
router.get("/orders/user/:userId", authenticateToken, orderController.getByUserId);

/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     summary: Tạo mới một đơn hàng
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderDTO'
 *     responses:
 *       201:
 *         description: Trả về thông tin đơn hàng vừa được tạo
 */
router.post("/orders", authenticateToken, orderController.create);

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   put:
 *     summary: Cập nhật thông tin của đơn hàng theo ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID của đơn hàng cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderDTO'
 *     responses:
 *       200:
 *         description: Trả về thông tin đơn hàng đã được cập nhật
 *       404:
 *         description: Đơn hàng không tồn tại
 */
router.put("/orders/:id", authenticateToken, orderController.update);

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   delete:
 *     summary: Xóa đơn hàng theo ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID của đơn hàng cần xóa
 *     responses:
 *       200:
 *         description: Thông báo xóa đơn hàng thành công
 *       404:
 *         description: Đơn hàng không tồn tại
 */
router.delete("/orders/:id", authenticateToken, orderController.delete);

/**
 * @swagger
 * /api/v1/orders/{orderId}/details:
 *   get:
 *     summary: Lấy danh sách chi tiết đơn hàng
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: number
 *         description: ID của đơn hàng
 *     responses:
 *       200:
 *         description: Trả về danh sách chi tiết đơn hàng
 */
router.get("/orders/:orderId/details", authenticateToken, orderController.getOrderDetails);

/**
 * @swagger
 * /api/v1/orders/{orderId}/details:
 *   post:
 *     summary: Thêm chi tiết đơn hàng
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: number
 *         description: ID của đơn hàng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order_DetailDTO'
 *     responses:
 *       201:
 *         description: Trả về thông tin chi tiết đơn hàng vừa được thêm
 */
router.post("/orders/:orderId/details", authenticateToken, orderController.addOrderDetail);

export default router; 