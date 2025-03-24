import { AppDataSource } from "../config/database";
import { Repository } from "typeorm";
import { Province } from "../entity/Province";
import { ProvinceDTO } from "../dto/ProvinceDTO";

export class ProvinceService {
    private provinceRepository: Repository<Province>;

    constructor() {
        AppDataSource.then((dataSource) => {
            this.provinceRepository = dataSource.getRepository(Province);
        }).catch((error) => {
            console.error("Lỗi khi kết nối DB:", error);
        });
    }

    async createProvince(provinceDTO: ProvinceDTO): Promise<Province> {
        const province = this.provinceRepository.create(provinceDTO);
        return await this.provinceRepository.save(province);
    }

    async getProvinceById(id: number): Promise<Province | null> {
        return await this.provinceRepository.findOneBy({ id });
    }

    async getAllProvinces(): Promise<Province[]> {
        return await this.provinceRepository.find({ relations: ["area", "districts"] });
    }

    async update(id: number, provinceDTO: ProvinceDTO): Promise<Province | null> {
        const province = await this.provinceRepository.findOneBy({ id });
        if (!province) return null;
        Object.assign(province, provinceDTO);
        return await this.provinceRepository.save(province);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.provinceRepository.delete(id);
        return result.affected !== 0;
    }
}
