import {Router} from "express";
import { ApiPath } from "../const/ApiPath";
import { ProductController } from "../controller/ProductController";

const router = Router();

/**
 * @swagger
 * /api/v1/products/search:
 *   get:
 *     summary: Tìm kiếm sản phẩm theo tên
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Tên sản phẩm cần tìm
 *     responses:
 *       200:
 *         description: Trả về danh sách sản phẩm tìm được
 *       400:
 *         description: Tên sản phẩm không hợp lệ
 */
router.get(`${ApiPath.BaseApi}/products/search`, ProductController.getProductByName);

/**
 * @swagger
 * /api/v1/products/category:
 *   get:
 *     summary: Tìm kiếm sản phẩm theo tên danh mục
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: categoryName
 *         required: true
 *         schema:
 *           type: string
 *         description: Tên danh mục cần tìm
 *     responses:
 *       200:
 *         description: Trả về danh sách sản phẩm trong danh mục
 *       400:
 *         description: Tên danh mục không hợp lệ
 */
router.get(`${ApiPath.BaseApi}/products/category`, ProductController.getProductByCategoryName);

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Tạo mới một product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductDTO'
 *     responses:
 *       201:
 *         description: Trả về thông tin product vừa được tạo
 */
router.post(ApiPath.CREATE_PRODUCT, ProductController.createProduct);

/**
 * @swagger
 * /api/v1/get-all-products:
 *   get:
 *     summary: Lấy danh sách tất cả product
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Trả về danh sách product
 */
router.get(ApiPath.GET_ALL_PRODUCTS, ProductController.getAllProducts);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Lấy thông tin một product theo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID của product cần lấy thông tin
 *     responses:
 *       200:
 *         description: Trả về thông tin product
 *       404:
 *         description: Product không tồn tại
 */
router.get(ApiPath.GET_PRODUCT_BY_ID, ProductController.getProductById);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     summary: Cập nhật thông tin của product theo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID của product cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductDTO'
 *     responses:
 *       200:
 *         description: Trả về thông tin product đã được cập nhật
 *       404:
 *         description: Product không tồn tại
 */
router.put(ApiPath.UPDATE_PRODUCT, ProductController.updateProduct);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Xóa product theo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID của product cần xóa
 *     responses:
 *       200:
 *         description: Thông báo xóa product thành công
 *       404:
 *         description: Product không tồn tại
 */
router.delete(ApiPath.DELETE_PRODUCT, ProductController.deleteProduct);

export default router;