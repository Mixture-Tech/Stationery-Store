import { DataSource } from "typeorm";
import { faker } from "@faker-js/faker";
import { Category_Parent } from "../../entity/Category_Parent";

export async function seedCategory_Parents(dataSource: DataSource) {
    const category_parentRepository = dataSource.getRepository(Category_Parent);

    const category_parents = [];
    for (let i = 0; i < 10; i++) {
        const categoryName = faker.commerce.department();
        const category_parent = category_parentRepository.create({
            name: categoryName,
            // Tạo slug từ categoryName
            link: faker.helpers.slugify(categoryName).toLowerCase(),
            hide: faker.datatype.boolean(),
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
        });
        category_parents.push(category_parent);
    }

    await category_parentRepository.save(category_parents);
    console.log("✅ 10 fake category_parents inserted!");
}
