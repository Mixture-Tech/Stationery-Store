import{ Router } from "express";
import { ProductController } from "../controller/ProductController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();
const productController = new ProductController();

/**
 * @swagger
 * /api/v1/products/upload-image:
 *   post:
 *     summary: Upload ảnh sản phẩm
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Trả về đường dẫn của ảnh đã upload
 *       500:
 *         description: Lỗi khi upload ảnh
 */
router.post("/products/upload-image", productController.uploadImage);

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Lấy danh sách tất cả sản phẩm
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Trả về danh sách sản phẩm
 */
router.get("/products", productController.getAll);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Lấy thông tin một sản phẩm theo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID của sản phẩm cần lấy thông tin
 *     responses:
 *       200:
 *         description: Trả về thông tin sản phẩm
 *       404:
 *         description: Sản phẩm không tồn tại
 */
router.get("/products/id/:id", productController.getById);

/**
 * @swagger
 * /api/v1/products/category/{categoryId}:
 *   get:
 *     summary: Lấy danh sách sản phẩm theo danh mục
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: number
 *         description: ID của danh mục
 *     responses:
 *       200:
 *         description: Trả về danh sách sản phẩm của danh mục
 */
router.get("/products/category/:categoryId", productController.getByCategoryId);

/**
 * @swagger
 * /api/v1/products/brand/{brand}:
 *   get:
 *     summary: Lấy danh sách sản phẩm theo thương hiệu
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: brand
 *         required: true
 *         schema:
 *           type: string
 *         description: Tên thương hiệu
 *     responses:
 *       200:
 *         description: Trả về danh sách sản phẩm của thương hiệu
 */
router.get("/products/brand/:brand", productController.getByBrand);

/**
 * @swagger
 * /api/v1/products/search/{name}:
 *   get:
 *     summary: Tìm kiếm sản phẩm theo tên
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Tên sản phẩm cần tìm kiếm
 *     responses:
 *       200:
 *         description: Trả về danh sách sản phẩm tìm được
 */
router.get("/products/name/:name", productController.getByName);

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Tạo mới một sản phẩm
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductDTO'
 *     responses:
 *       201:
 *         description: Trả về thông tin sản phẩm vừa được tạo
 */
// router.post("/products", authenticateToken, productController.create);

router.post("/products", productController.create);
/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     summary: Cập nhật thông tin của sản phẩm theo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID của sản phẩm cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductDTO'
 *     responses:
 *       200:
 *         description: Trả về thông tin sản phẩm đã được cập nhật
 *       404:
 *         description: Sản phẩm không tồn tại
 */
router.put("/products/:id", authenticateToken, productController.update);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Xóa sản phẩm theo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID của sản phẩm cần xóa
 *     responses:
 *       200:
 *         description: Thông báo xóa sản phẩm thành công
 *       404:
 *         description: Sản phẩm không tồn tại
 */
router.delete("/products/:id", authenticateToken, productController.delete);

export default router;