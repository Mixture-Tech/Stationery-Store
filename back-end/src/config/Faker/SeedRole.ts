import { DataSource } from "typeorm";
import { Role } from "../../entity/Role";
import { faker } from "@faker-js/faker";

export async function seedRoles(dataSource: DataSource) {
    const roleRepository = dataSource.getRepository(Role);

    const roles = [];
    const roleType = ["User", "Admin"];
    for (let i = 0; i < 2; i++) {
        const role = roleRepository.create({
            name: roleType[i]
        });
        roles.push(role);
    }

    await roleRepository.save(roles);
    console.log("✅ 2 fake roles inserted!");
}
