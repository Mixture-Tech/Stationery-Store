import { DataSource, EntityTarget } from "typeorm";
import { Order } from "../entity/Order";
import { BaseService } from "./BaseService";
import { OrderDTO } from "../dto/OrderDTO";
import { Order_Detail } from "../entity/Order_Detail";
import { Order_DetailDTO } from "../dto/Order_DetailDTO";

export class OrderService extends BaseService<Order, OrderDTO> {
    private orderDetailRepository: Repository<Order_Detail>;

    constructor(entity: EntityTarget<Order>, dataSource: DataSource) {
        super(entity, dataSource);
        this.orderDetailRepository = dataSource.getRepository(Order_Detail);
    }

    async findById(id_order: number): Promise<Order | null> {
        return this.repository.findOne({ 
            where: { id_order },
            relations: ["user", "district", "orderDetails"]
        });
    }

    async findByUserId(id_user: number): Promise<Order[]> {
        return this.repository.find({
            where: { id_user },
            relations: ["user", "district", "orderDetails"]
        });
    }

    async findByDistrictId(id_district: number): Promise<Order[]> {
        return this.repository.find({
            where: { id_district },
            relations: ["user", "district", "orderDetails"]
        });
    }

    async findByStatus(status: string): Promise<Order[]> {
        return this.repository.find({
            where: { status },
            relations: ["user", "district", "orderDetails"]
        });
    }

    async createOrder(orderDTO: OrderDTO): Promise<Order> {
        return this.create(orderDTO);
    }

    async updateOrder(id_order: number, orderDTO: OrderDTO): Promise<Order | null> {
        return this.update(id_order, orderDTO);
    }

    async deleteOrder(id_order: number): Promise<boolean> {
        return this.delete(id_order);
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
