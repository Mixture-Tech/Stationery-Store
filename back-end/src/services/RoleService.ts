import { AppDataSource } from "../config/database";
import { Role } from "../entity/Role";
import { RoleDTO } from "../dto/RoleDTO";
import { Repository } from "typeorm";

export class RoleService{
    private roleRepository: Repository<Role>;
    constructor() {
        AppDataSource.then((dataSource) => {
            this.roleRepository = dataSource.getRepository(Role);
        }).catch((error) => {
            console.error("Lỗi khi kết nối DB:", error);
        });
    }

    async createRole(roleDTO: RoleDTO): Promise<Role> {
        const role = this.roleRepository.create(roleDTO);
        return await this.roleRepository.save(role);
    }

    async getRoleById(id: number): Promise<Role | null> {
        return await this.roleRepository.findOneBy({id});
    }

    async getAllRoles(): Promise<Role[]> {
        return await this.roleRepository.find();
    }

    async update(id: number, roleDTO: RoleDTO): Promise<Role | null> {
        const role = await this.roleRepository.findOneBy({id});
        if (!role) return null;
        Object.assign(role, roleDTO);
        return await this.roleRepository.save(role);
    }

    async delete(id: number): Promise<Boolean>{
        const result = await this.roleRepository.delete(id);
        return true;
    }
}
