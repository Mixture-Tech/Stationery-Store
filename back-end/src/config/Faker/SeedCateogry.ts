import { DataSource } from "typeorm";
import { faker } from "@faker-js/faker";
import { Category } from "../../entity/Category";
import { Category_Parent } from "../../entity/Category_Parent";

export async function seedCategories(dataSource: DataSource) {
  const categoryRepository = dataSource.getRepository(Category);
  const parentRepository = dataSource.getRepository(Category_Parent);

  // Lấy tất cả các Category_Parent đã seed trước đó
  const categoryParents = await parentRepository.find();
  if (categoryParents.length === 0) {
    throw new Error("Không tìm thấy Category_Parent. Hãy seed Category_Parent trước khi seed Category.");
  }

  // Mảng các tên danh mục cụ thể
  const categoryNames = [
    "Đồ chơi",
    "Đồ gia dụng",
    "Thời trang",
    "Đồ điện tử",
    "Đồ văn phòng phẩm",
    "Đồ thể thao",
    "Đồ mỹ phẩm",
    "Đồ nội thất",
    "Đồ nấu ăn",
    "Chăm sóc cá nhân",
    "Sách"
  ];

  const categories = [];
  for (let i = 0; i < categoryNames.length; i++) {
    const name_category = categoryNames[i];
    const category = categoryRepository.create({
      name_category,
      link: faker.helpers.slugify(name_category).toLowerCase(),
      hide: faker.datatype.boolean(),
      cateogry_parent: faker.helpers.arrayElement(categoryParents),
      // created_at và updated_at sẽ được tự động gán theo default trong entity
    });
    categories.push(category);
  }

  await categoryRepository.save(categories);
  console.log("✅ 10 fake categories inserted!");
}
