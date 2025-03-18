import { DataSource } from "typeorm";
import { faker } from "@faker-js/faker";
import { Product } from "../../entity/Product";
import { Category } from "../../entity/Category";

export async function seedProducts(dataSource: DataSource) {
  const productRepository = dataSource.getRepository(Product);
  const categoryRepository = dataSource.getRepository(Category);

  // Lấy các Category liên quan đến sách và đồ chơi
  const bookCategory = await categoryRepository.findOne({ where: { name_category: "Sách" } });
  const toyCategory = await categoryRepository.findOne({ where: { name_category: "Đồ chơi" } });

  if (!bookCategory || !toyCategory) {
    throw new Error("Không tìm thấy category Sách hoặc Đồ chơi. Hãy seed Category trước.");
  }

  // Các tên sản phẩm cụ thể cho sách và đồ chơi
  const bookNames = [
    "Sách Giáo Khoa",
    "Sách Văn Học",
    "Sách Lịch Sử",
    "Sách Khoa Học",
    "Sách Nghệ Thuật"
  ];

  const toyNames = [
    "Đồ chơi xe hơi",
    "Búp bê",
    "Đồ chơi xếp hình",
    "Đồ chơi điều khiển từ xa",
    "Đồ chơi xếp lắp"
  ];

  const products = [];

  for (let i = 0; i < 5; i++) {
    const product = productRepository.create({
      name: bookNames[i],
      nums: faker.number.int({ min: 10, max: 100 }),
      price: faker.number.float({ min: 50, max: 200, fractionDigits: 2 }),
      detail: faker.lorem.sentence(),
      link: faker.internet.url(),
      discount_price: faker.number.float({ min: 10, max: 50, fractionDigits: 2 }),
      description: faker.lorem.paragraph(),
      image: "",
      discount: faker.number.int({ min: 0, max: 50 }),
      hide: faker.datatype.boolean(),
      brand: faker.company.name(),
      created_at: faker.date.past(),
      category: bookCategory
    });
    products.push(product);
  }


  for (let i = 0; i < 5; i++) {
    const product = productRepository.create({
      name: toyNames[i],
      nums: faker.number.int({ min: 10, max: 100 }),
      price: faker.number.float({ min: 50, max: 200, fractionDigits: 2 }),
      detail: faker.lorem.sentence(),
      link: faker.internet.url(),
      discount_price: faker.number.float({ min: 10, max: 50, fractionDigits: 2 }),
      description: faker.lorem.paragraph(),
      image: "",
      discount: faker.number.int({ min: 0, max: 50 }),
      hide: faker.datatype.boolean(),
      brand: faker.company.name(),
      created_at: faker.date.past(),
      category: toyCategory
    });
    products.push(product);
  }

  await productRepository.save(products);
  console.log("✅ 10 fake products inserted!");
}
