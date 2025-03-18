import { DataSource } from "typeorm";
import { faker } from "@faker-js/faker";
import { Province } from "../../entity/Province";
import { Area } from "../../entity/Area";
import { District } from "../../entity/District";

export async function seedDistricts(dataSource: DataSource) {
    const districtRepository = dataSource.getRepository(District);
    const areaRepository = dataSource.getRepository(Area);
    const provinceRepository = dataSource.getRepository(Province);

    // Lấy tất cả các area đã seed trước đó
    const areas = await areaRepository.find();
    if (areas.length === 0) {
        throw new Error("Không tìm thấy role. Hãy seed role trước khi seed user.");
    }

    // Lấy tất cả các area đã seed trước đó
    const provinces = await provinceRepository.find();
    if (provinces.length === 0) {
        throw new Error("Không tìm thấy role. Hãy seed role trước khi seed user.");
    }

    const districts = [];
    const districtName = [
        "Huyện Mê Linh",
        "Huyện Đông Anh",
        "Huyện Sóc Sơn",
        "Huyện Thanh Trì",
        "Huyện Gia Lâm",
        "Huyện Ba Vì",
        "Huyện Chương Mỹ",
        "Huyện Phúc Thọ",
        "Huyện Thạch Thất",
        "Huyện Hoài Đức"]
    for (let i = 0; i < districtName.length; i++) {
        const district = districtRepository.create({
            name: districtName[i],
            fee: faker.number.int({ min: 100000, max: 1000000 }),
            province: provinces[i % provinces.length], // Chọn ng��u nhiên tỉnh để gán cho tỉnh
            area: areas[i % areas.length] // Chọn ng��u nhiên area để gán cho tỉnh

        });
        districts.push(district);
    }

    await districtRepository.save(districts);
    console.log("✅", districtName.length,"fake district inserted!");
}
