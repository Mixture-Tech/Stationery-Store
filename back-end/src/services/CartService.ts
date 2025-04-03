import { AppDataSource } from "../config/database";
import { Cart } from "../entity/Cart";
import { Product } from "../entity/Product";
import { User } from "../entity/User";

export class CartService {
    private static instance: CartService;
    private cartRepository: any;
    private productRepository: any;
    private userRepository: any;

    private constructor(dataSource: any) {
        this.cartRepository = dataSource.getRepository(Cart);
        this.productRepository = dataSource.getRepository(Product);
        this.userRepository = dataSource.getRepository(User);
    }

    public static async getInstance(): Promise<CartService> {
        if (!CartService.instance) {
            const dataSource = await AppDataSource;
            CartService.instance = new CartService(dataSource);
        }
        return CartService.instance;
    }

    public async getCartByUser(id: number): Promise<Cart[]> {
        try {
            const cartItems = await this.cartRepository.find({
                where: { id_user: id },
                relations: ["product"]
            });

            return cartItems.map((item: Cart) => ({
                ...item,
                productImage: item.product.image,
                productName: item.product.name,
                productDescription: item.product.description,
                productPrice: Number(item.product.price),
                total_price: Number(item.total_price)
            }));
        } catch (error) {
            throw error;
        }
    }

    public async addToCart(id: number, id_product: number, quantity: number): Promise<Cart> {
        try {
            // Kiểm tra sản phẩm có tồn tại không
            const product = await this.productRepository.findOne({ where: { id_product } });
            if (!product) {
                throw new Error("Sản phẩm không tồn tại");
            }

            // Kiểm tra user có tồn tại không
            const user = await this.userRepository.findOne({ where: { id_user: id } });
            if (!user) {
                throw new Error("Người dùng không tồn tại");
            }

            const productPrice = Number(product.price);

            // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
            let cartItem = await this.cartRepository.findOne({
                where: { id_user: id, id_product }
            });

            if (cartItem) {
                // Nếu đã có thì cập nhật số lượng
                cartItem.quantity += quantity;
                cartItem.total_price = cartItem.quantity * productPrice;
            } else {
                // Nếu chưa có thì tạo mới
                cartItem = this.cartRepository.create({
                    id_user: id,
                    id_product,
                    quantity,
                    total_price: quantity * productPrice,
                    hide: false
                });
            }

            const savedCart = await this.cartRepository.save(cartItem);
            return {
                ...savedCart,
                total_price: Number(savedCart.total_price)
            };
        } catch (error) {
            throw error;
        }
    }

    public async updateCartItem(id: number, id_product: number, quantity: number): Promise<Cart> {
        try {
            const cartItem = await this.cartRepository.findOne({
                where: { id_user: id, id_product }
            });

            if (!cartItem) {
                throw new Error("Sản phẩm không tồn tại trong giỏ hàng");
            }

            const product = await this.productRepository.findOne({ where: { id_product } });
            if (!product) {
                throw new Error("Sản phẩm không tồn tại");
            }

            const productPrice = Number(product.price);
            cartItem.quantity = quantity;
            cartItem.total_price = quantity * productPrice;

            const savedCart = await this.cartRepository.save(cartItem);
            return {
                ...savedCart,
                total_price: Number(savedCart.total_price)
            };
        } catch (error) {
            throw error;
        }
    }

    public async removeFromCart(id: number, id_product: number): Promise<void> {
        try {
            const result = await this.cartRepository.delete({ id_user: id, id_product });
            if (result.affected === 0) {
                throw new Error("Sản phẩm không tồn tại trong giỏ hàng");
            }
        } catch (error) {
            throw error;
        }
    }
}