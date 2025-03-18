import { DataSource } from "typeorm";
import { faker } from "@faker-js/faker";
import { Order_Detail } from "../../entity/Order_Detail";
import { Order } from "../../entity/Order";
import { District } from "../../entity/District";
import { Province } from "../../entity/Province";
import { Area } from "../../entity/Area";
import { Product } from "../../entity/Product";

export async function seedOrderDetails(dataSource: DataSource) {
  const orderDetailRepository = dataSource.getRepository(Order_Detail);
  const orderRepository = dataSource.getRepository(Order);
  const districtRepository = dataSource.getRepository(District);
  const provinceRepository = dataSource.getRepository(Province);
  const areaRepository = dataSource.getRepository(Area);
  const productRepository = dataSource.getRepository(Product);

  // Lấy các bản ghi đã seed cho các entity liên quan
  const orders = await orderRepository.find();
  const districts = await districtRepository.find();
  const provinces = await provinceRepository.find();
  const areas = await areaRepository.find();
  const products = await productRepository.find();

  if (orders.length === 0 || districts.length === 0 || provinces.length === 0 || areas.length === 0 || products.length === 0) {
    throw new Error("Hãy seed các bảng Order, District, Province, Area và Product trước khi seed Order_Detail.");
  }

  const orderDetails = [];
  for (let i = 0; i < 10; i++) {
    const orderDetailData = {
      // Gán ngẫu nhiên các đối tượng liên quan cho các khóa ngoại
      order: faker.helpers.arrayElement(orders),
      district: faker.helpers.arrayElement(districts),
      province: faker.helpers.arrayElement(provinces),
      area: faker.helpers.arrayElement(areas),
      product: faker.helpers.arrayElement(products),
    };

    orderDetails.push(orderDetailData);
  }

  // Tạo các bản ghi Order_Detail từ mảng dữ liệu
  const createdOrderDetails = orderDetailRepository.create(orderDetails);
  await orderDetailRepository.save(createdOrderDetails);
  console.log("✅ 10 fake order_details inserted!");
}
