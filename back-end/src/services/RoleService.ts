import { Repository } from "typeorm";
import { Role } from "../entity/Role";
import { BaseService } from "./BaseService";

export class RoleService extends BaseService<Role> {
    constructor(repository: Repository<Role>) {
        super(repository);
    }

    async findById(id_role: number): Promise<Role | null> {
        return this.repository.findOne({ where: { id_role } });
    }

    async findByName(name: string): Promise<Role | null> {
        return this.repository.findOne({ where: { name } });
    }
}
