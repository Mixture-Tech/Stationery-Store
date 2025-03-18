import { DataSource } from "typeorm";
import { faker } from "@faker-js/faker";
import { Cart } from "../../entity/Cart";
import { Product } from "../../entity/Product";
import { User } from "../../entity/User";

export async function seedCarts(dataSource: DataSource) {
  const cartRepository = dataSource.getRepository(Cart);
  const productRepository = dataSource.getRepository(Product);
  const userRepository = dataSource.getRepository(User);

  // Lấy danh sách các Product và User đã được seed
  const products = await productRepository.find();
  const users = await userRepository.find();

  if (products.length === 0 || users.length === 0) {
    throw new Error("Hãy seed Product và User trước khi seed Cart.");
  }

  const carts = [];
  for (let i = 0; i < 10; i++) {
    // Chọn ngẫu nhiên một Product và User
    const product = faker.helpers.arrayElement(products);
    const user = faker.helpers.arrayElement(users);
    const quantity = faker.number.int({ min: 1, max: 5 });
    // Tính tổng giá (total_price) dựa trên giá của product nhân với số lượng
    const total_price = product.price * quantity;

    const cart = cartRepository.create({
      product,
      user,
      quantity,
      total_price,
      hide: faker.datatype.boolean(),
    });
    carts.push(cart);
  }

  await cartRepository.save(carts);
  console.log("✅ 10 fake carts inserted!");
}
