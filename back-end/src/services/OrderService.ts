import { DataSource, EntityTarget, Repository } from "typeorm";
import { Order } from "../entity/Order";
import { BaseService } from "./BaseService";
import { OrderDTO } from "../dto/OrderDTO";
import { Order_Detail } from "../entity/Order_Detail";
import { Order_DetailDTO } from "../dto/Order_DetailDTO";
import { AppDataSource } from '../config/database';

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
        try {
            // Lấy id_order lớn nhất hiện tại
            const maxOrder = await this.repository.createQueryBuilder('order')
                .select('MAX(order.id_order)', 'maxId')
                .getRawOne();
            
            const nextId = (maxOrder?.maxId || 0) + 1;

            // Tạo đơn hàng mới
            const order = this.repository.create({
                id_order: nextId,
                id_user: orderDTO.id_user,
                id_province: orderDTO.id_province,
                id_district: orderDTO.id_district,
                area: orderDTO.area,
                phone: orderDTO.phone,
                delivery_fee: orderDTO.delivery_fee,
                total_price: orderDTO.total_price,
                status: 'pending'
            });

            // Lưu đơn hàng vào database
            const savedOrder = await this.repository.save(order);

            // Tạo chi tiết đơn hàng
            if (orderDTO.products && orderDTO.products.length > 0) {
                // Lấy id_order_detail lớn nhất hiện tại
                const maxOrderDetail = await this.orderDetailRepository.createQueryBuilder('order_detail')
                    .select('MAX(order_detail.id_order_detail)', 'maxId')
                    .getRawOne();
                
                const nextOrderDetailId = (maxOrderDetail?.maxId || 0) + 1;

                const orderDetails = orderDTO.products.map((product, index) => {
                    return this.orderDetailRepository.create({
                        id_order_detail: nextOrderDetailId + index,
                        id_order: savedOrder.id_order,
                        id_product: product.id_product,
                        quantity: product.quantity,
                        total_product: product.price
                    });
                });

                // Lưu chi tiết đơn hàng
                await this.orderDetailRepository.save(orderDetails);
            }

            return savedOrder;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
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
        return await this.orderDetailRepository.findOneBy({ id_order_detail: id });
    }

    async getAllOrderDetails(): Promise<Order_Detail[]> {
        return await this.orderDetailRepository.find();
    }

    async updateOrderDetail(id: number, orderDetailDTO: Order_DetailDTO): Promise<Order_Detail | null> {
        const orderDetail = await this.orderDetailRepository.findOneBy({ id_order_detail: id });
        if (!orderDetail) return null;
        Object.assign(orderDetail, orderDetailDTO);
        return await this.orderDetailRepository.save(orderDetail);
    }

    async deleteOrderDetail(id: number): Promise<boolean> {
        await this.orderDetailRepository.delete(id);
        return true;
    }
}
