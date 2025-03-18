import { DataSource } from "typeorm";
import { faker } from "@faker-js/faker";
import { Order } from "../../entity/Order";
import { User } from "../../entity/User";
import { District } from "../../entity/District";
import { Province } from "../../entity/Province";
import { Area } from "../../entity/Area";

export async function seedOrders(dataSource: DataSource) {
  const orderRepository = dataSource.getRepository(Order);
  const userRepository = dataSource.getRepository(User);
  const districtRepository = dataSource.getRepository(District);
  const provinceRepository = dataSource.getRepository(Province);
  const areaRepository = dataSource.getRepository(Area);

  // Lấy tất cả các bản ghi đã được seed
  const users = await userRepository.find();
  const districts = await districtRepository.find();
  const provinces = await provinceRepository.find();
  const areas = await areaRepository.find();

  if (users.length === 0 || districts.length === 0 || provinces.length === 0 || areas.length === 0) {
    throw new Error("Hãy seed User, District, Province và Area trước khi seed Order.");
  }

  const orders = [];
  for (let i = 0; i < 10; i++) {
    const orderData = {
      total_price: faker.number.float({ min: 100, max: 1000, fractionDigits: 2 }),
      status: faker.helpers.arrayElement(["pending", "completed", "cancelled"]),
      hide: faker.datatype.boolean(),
      paymentmethods: faker.helpers.arrayElement(["cash", "credit card", "paypal"]),
      created_at: faker.date.past(),
      user: faker.helpers.arrayElement(users),
      district: faker.helpers.arrayElement(districts),
      province: faker.helpers.arrayElement(provinces),
      area: faker.helpers.arrayElement(areas),
    };

    orders.push(orderData);
  }

  // Tạo các order từ mảng dữ liệu
  const createdOrders = orderRepository.create(orders);
  await orderRepository.save(createdOrders);
  console.log("✅ 10 fake orders inserted!");
}
