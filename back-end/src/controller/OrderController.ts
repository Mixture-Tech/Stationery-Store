import { Request, Response } from "express";
import { Order } from "../entity/Order";
import { OrderService } from "../services/OrderService";
import { AppDataSource } from "../config/database";
import { OrderDTO } from "../dto/OrderDTO";
import { Order_DetailDTO } from "../dto/Order_DetailDTO";

export class OrderController {
    private orderService: OrderService;

    constructor() {
        AppDataSource.then(dataSource => {
            this.orderService = new OrderService(Order, dataSource);
        });
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const orders = await this.orderService.getAll();
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy danh sách đơn hàng", error });
        }
    }

    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const order = await this.orderService.findById(id);
            if (!order) {
                res.status(404).json({ message: "Không tìm thấy đơn hàng" });
                return;
            }
            res.json(order);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy thông tin đơn hàng", error });
        }
    }

    getByUserId = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = parseInt(req.params.userId);
            const orders = await this.orderService.findByUserId(userId);
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy danh sách đơn hàng của người dùng", error });
        }
    }

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const order = await this.orderService.createOrder(req.body);
            res.status(201).json(order);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi tạo đơn hàng mới", error });
        }
    }

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const order = await this.orderService.updateOrder(id, req.body);
            if (!order) {
                res.status(404).json({ message: "Không tìm thấy đơn hàng" });
                return;
            }
            res.json(order);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi cập nhật đơn hàng", error });
        }
    }

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const result = await this.orderService.deleteOrder(id);
            if (!result) {
                res.status(404).json({ message: "Không tìm thấy đơn hàng" });
                return;
            }
            res.json({ message: "Đã xóa đơn hàng thành công" });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi xóa đơn hàng", error });
        }
    }

    addOrderDetail = async (req: Request, res: Response): Promise<void> => {
        try {
            const orderDetailDTO: Order_DetailDTO = req.body;
            const orderDetail = await this.orderService.createOrderDetail(orderDetailDTO);
            res.status(201).json(orderDetail);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    getOrderDetails = async (req: Request, res: Response): Promise<void> => {
        try {
            const orderDetails = await this.orderService.getOrderDetailById(parseInt(req.params.orderId));
            res.status(200).json(orderDetails);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
