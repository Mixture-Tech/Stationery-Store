import { AppDataSource } from "../config/database";
import { Repository } from "typeorm";
import { District } from "../entity/District";
import { DistrictDTO } from "../dto/DistrictDTO";

export class DistrictService {
    private districtRepository: Repository<District>;

    constructor() {
        AppDataSource.then((dataSource) => {
            this.districtRepository = dataSource.getRepository(District);
        }).catch((error) => {
            console.error("Lỗi khi kết nối DB:", error);
        });
    }

    async createDistrict(districtDTO: DistrictDTO): Promise<District> {
        const district = this.districtRepository.create(districtDTO);
        return await this.districtRepository.save(district);
    }

    async getDistrictById(id: number): Promise<District | null> {
        return await this.districtRepository.findOneBy({ id });
    }

    async getAllDistricts(): Promise<District[]> {
        return await this.districtRepository.find();
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.districtRepository.delete(id);
        return result.affected !== 0;
    }
}