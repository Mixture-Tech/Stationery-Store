import { AppDataSource } from "../config/database";
import { Cart } from "../entity/Cart";
import { Product } from "../entity/Product";
import { User } from "../entity/User";

export class CartService {
    private static instance: CartService;
    private cartRepository = (async () => (await AppDataSource).getRepository(Cart))();
    private productRepository = (async () => (await AppDataSource).getRepository(Product))();
    private userRepository = (async () => (await AppDataSource).getRepository(User))();

    private constructor() {}

    public static getInstance(): CartService {
        if (!CartService.instance) {
            CartService.instance = new CartService();
        }
        return CartService.instance;
    }

    async getCartByUserId(userId: number) {
        const cartRepo = await this.cartRepository;
        return await cartRepo.find({
            where: { user: { id_user: userId } },
            relations: ["product"]
        });
    }

    async addToCart(userId: number, productId: number, quantity: number) {
        const userRepo = await this.userRepository;
        const productRepo = await this.productRepository;
        const cartRepo = await this.cartRepository;

        const user = await userRepo.findOne({ where: { id_user: userId } });
        const product = await productRepo.findOne({ where: { id_product: productId } });

        if (!user || !product) {
            throw new Error("User hoặc Product không tồn tại");
        }

        let cartItem = await cartRepo.findOne({
            where: {
                user: { id_user: userId },
                product: { id_product: productId }
            }
        });

        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cartItem = cartRepo.create({
                user,
                product,
                quantity
            });
        }

        return await cartRepo.save(cartItem);
    }

    async updateCartItem(userId: number, productId: number, quantity: number) {
        const cartRepo = await this.cartRepository;
        const cartItem = await cartRepo.findOne({
            where: {
                user: { id_user: userId },
                product: { id_product: productId }
            }
        });

        if (!cartItem) {
            throw new Error("Sản phẩm không tồn tại trong giỏ hàng");
        }

        cartItem.quantity = quantity;
        return await cartRepo.save(cartItem);
    }

    async removeFromCart(userId: number, productId: number) {
        const cartRepo = await this.cartRepository;
        const cartItem = await cartRepo.findOne({
            where: {
                user: { id_user: userId },
                product: { id_product: productId }
            }
        });

        if (!cartItem) {
            throw new Error("Sản phẩm không tồn tại trong giỏ hàng");
        }

        await cartRepo.remove(cartItem);
        return true;
    }
}