import { AppDataSource } from "../config/database";
import { Cart } from "../entity/Cart";
import { CartDTO } from "../dto/CartDTO";
import { Repository } from "typeorm";

export class CartService {
    private cartRepository: Repository<Cart>;
    constructor() {
        AppDataSource.then((dataSource) => {
            this.cartRepository = dataSource.getRepository(Cart);
        }).catch((error) => {
            console.error("Lỗi khi kết nối DB:", error);
        });
    }

    async createCart(CartDTO: CartDTO): Promise<Cart> {
        const cart = this.cartRepository.create(CartDTO);
        return await this.cartRepository.save(cart);
    }

    async getCartById(id: number): Promise<Cart | null> {
        return await this.cartRepository.findOneBy({id});
    }

    async getAllCarts(): Promise<Cart[]> {
        return await this.cartRepository.find();
    }

    async update(id: number, CartDTO: CartDTO): Promise<Cart | null> {
        const cart = await this.cartRepository.findOneBy({id});
        if (!cart) return null;
        Object.assign(cart, CartDTO);
        return await this.cartRepository.save(cart);
    }

    async delete(id: number): Promise<Boolean>{
        const result  = await this.cartRepository.delete(id);
        return true;
    }
}