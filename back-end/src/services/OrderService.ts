import { AppDataSource } from "../config/database";
import { Repository } from "typeorm";
import { Order } from "../entity/Order";
import { OrderDTO } from "../dto/OrderDTO";
import { Order_Detail } from "../entity/Order_Detail";
import { Order_DetailDTO } from "../dto/Order_DetailDTO";

export class OrderService {
    private orderRepository: Repository<Order>;
    private orderDetailRepository: Repository<Order_Detail>;

    constructor() {
        AppDataSource.then((dataSource) => {
            this.orderRepository = dataSource.getRepository(Order);
            this.orderDetailRepository = dataSource.getRepository(Order_Detail);
        }).catch((error) => {
            console.error("Lỗi khi kết nối DB:", error);
        });
    }

    // Order Methods
    async createOrder(orderDTO: OrderDTO): Promise<Order> {
        const order = this.orderRepository.create(orderDTO);
        return await this.orderRepository.save(order);
    }

    async getOrderById(id: number): Promise<Order | null> {
        return await this.orderRepository.findOneBy({ id });
    }

    async getAllOrders(): Promise<Order[]> {
        return await this.orderRepository.find();
    }

    async updateOrder(id: number, orderDTO: OrderDTO): Promise<OrderDTO | null> {
        const order = await this.orderRepository.findOneBy({ id });
        if (!order) return null;
        Object.assign(order, orderDTO);
        return await this.orderRepository.save(order);
    }

    async deleteOrder(id: number): Promise<boolean> {
        await this.orderRepository.delete(id);
        return true;
    }

    // Order Detail Methods
    async createOrderDetail(orderDetailDTO: Order_DetailDTO): Promise<Order_Detail> {
        const orderDetail = this.orderDetailRepository.create(orderDetailDTO);
        return await this.orderDetailRepository.save(orderDetail);
    }

    async getOrderDetailById(id: number): Promise<Order_Detail | null> {
        return await this.orderDetailRepository.findOneBy({ id });
    }

    async getAllOrderDetails(): Promise<Order_Detail[]> {
        return await this.orderDetailRepository.find();
    }

    async updateOrderDetail(id: number, orderDetailDTO: Order_DetailDTO): Promise<Order_DetailDTO | null> {
        const orderDetail = await this.orderDetailRepository.findOneBy({ id });
        if (!orderDetail) return null;
        Object.assign(orderDetail, orderDetailDTO);
        return await this.orderDetailRepository.save(orderDetail);
    }

    async deleteOrderDetail(id: number): Promise<boolean> {
        await this.orderDetailRepository.delete(id);
        return true;
    }
}
