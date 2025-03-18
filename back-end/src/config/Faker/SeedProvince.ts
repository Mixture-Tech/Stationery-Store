import { DataSource } from "typeorm";
import { faker } from "@faker-js/faker";
import { Province } from "../../entity/Province";
import { Area } from "../../entity/Area";

export async function seedProvinces(dataSource: DataSource) {
    const provinceRepository = dataSource.getRepository(Province);
    const areaRepository = dataSource.getRepository(Area);

    // Lấy tất cả các area đã seed trước đó
    const areas = await areaRepository.find();
    if (areas.length === 0) {
        throw new Error("Không tìm thấy role. Hãy seed role trước khi seed user.");
    }

    const provinces = [];
    const provinceName = [
        "Tỉnh Hà Tĩnh",
        "Tỉnh Thanh Hóa",
        "Tỉnh Nghệ An",
        "Tỉnh Quảng Ninh",
        "Tỉnh Bình Dương",
        "Tỉnh Đồng Nai",
        "Tỉnh Quảng Nam",
        "Tỉnh Lâm Đồng",
        "Tỉnh Bình Phước",
        "Tỉnh Ninh Thuận"]
    for (let i = 0; i < provinceName.length; i++) {
        const province = provinceRepository.create({
            name: provinceName[i],
            area: areas[i % areas.length] // Chọn ng��u nhiên area để gán cho tỉnh

        });
        provinces.push(province);
    }

    await provinceRepository.save(provinces);
    console.log("✅", provinceName.length,"fake provinces inserted!");
}
