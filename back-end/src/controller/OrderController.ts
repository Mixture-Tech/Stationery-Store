import { Request, Response } from "express";
import { OrderService } from "../services/OrderService";
import { OrderDTO } from "../dto/OrderDTO";
import { Order_DetailDTO } from "../dto/Order_DetailDTO";

export class OrderController {
    static async createOrder(req: Request, res: Response): Promise<void> {
        try {
            const orderDTO: OrderDTO = req.body;
            const order = await new OrderService().createOrder(orderDTO);
            res.status(201).json(order);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getAllOrders(req: Request, res: Response): Promise<void> {
        try {
            const orders = await new OrderService().getAllOrders();
            res.status(200).json(orders);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getOrderById(req: Request, res: Response): Promise<void> {
        try {
            const order = await new OrderService().getOrderById(parseInt(req.params.id));
            if (!order) {
                res.status(404).json({ message: "Order not found" });
                return;
            }
            res.status(200).json(order);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async updateOrder(req: Request, res: Response): Promise<void> {
        try {
            const orderDTO: OrderDTO = req.body;
            const updatedOrder = await new OrderService().updateOrder(parseInt(req.params.id), orderDTO);
            if (!updatedOrder) {
                res.status(404).json({ message: "Order not found" });
                return;
            }
            res.status(200).json(updatedOrder);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteOrder(req: Request, res: Response): Promise<void> {
        try {
            const isDeleted = await new OrderService().deleteOrder(parseInt(req.params.id));
            if (!isDeleted) {
                res.status(404).json({ message: "Order not found" });
                return;
            }
            res.status(200).json({ message: "Order deleted successfully" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async addOrderDetail(req: Request, res: Response): Promise<void> {
        try {
            const orderDetailDTO: Order_DetailDTO = req.body;
            const orderDetail = await new OrderService().createOrderDetail(orderDetailDTO);
            res.status(201).json(orderDetail);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getOrderDetails(req: Request, res: Response): Promise<void> {
        try {
            const orderDetails = await new OrderService().getOrderDetailById(parseInt(req.params.orderId));
            res.status(200).json(orderDetails);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
