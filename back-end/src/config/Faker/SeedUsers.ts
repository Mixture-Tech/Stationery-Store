import { DataSource } from "typeorm";
import { User } from "../../entity/User";
import { Role } from "../../entity/Role";
import { faker } from "@faker-js/faker";

export async function seedUsers(dataSource: DataSource) {
    const userRepository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);

    // Lấy tất cả các role đã seed trước đó
    const roles = await roleRepository.find();
    if (roles.length === 0) {
        throw new Error("Không tìm thấy role. Hãy seed role trước khi seed user.");
    }

    const users = [];
    for (let i = 0; i < 10; i++) {
        // Chọn ngẫu nhiên một role từ danh sách roles
        const randomRole = faker.helpers.arrayElement(roles);
        const user = userRepository.create({
            name: faker.internet.username(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            address: faker.location.streetAddress(),
            phone: faker.string.numeric(10),
            hide: faker.datatype.boolean(), 
            gender: faker.helpers.arrayElement([true, false]),
            avatar: faker.image.avatar(),
            create_at: new Date(),
            // Gán role hợp lệ cho user
            role: randomRole 
        });
        users.push(user);
    }

    await userRepository.save(users);
    console.log("✅ 10 fake users inserted!");
}
