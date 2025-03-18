import { DataSource, Repository, EntityTarget, ObjectLiteral, DeepPartial } from "typeorm";

export abstract class BaseService<T extends ObjectLiteral, DTO> {
  protected repository: Repository<T>;

  constructor(entity: EntityTarget<T>, dataSource: DataSource) {
    this.repository = dataSource.getRepository(entity);
  }

  async create(dto: DTO): Promise<T> {
    const entity = this.repository.create(dto as DeepPartial<T>);
    return await this.repository.save(entity);
  }

  async getById(id: number): Promise<T | null> {
    return await this.repository.findOneBy({ id } as any);
  }

  async getAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async update(id: number, dto: DTO): Promise<T | null> {
    const entity = await this.repository.findOneBy({ id } as any);
    if (!entity) return null;
    Object.assign(entity, dto);
    return await this.repository.save(entity);
  }

  async delete(id: number): Promise<boolean> {
    await this.repository.delete(id);
    return true;
  }
}
