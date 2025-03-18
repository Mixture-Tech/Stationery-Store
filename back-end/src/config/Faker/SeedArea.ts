import { DataSource } from "typeorm";
import { faker } from "@faker-js/faker";
import { Area } from "../../entity/Area";

export async function seedAreas(dataSource: DataSource) {
    const areaRepository = dataSource.getRepository(Area);

    const areas = [];
    const areaName = [
        'đường linh trung',
        'đường linh tây',
        'đường hồ xuân hương',
        'đường quang trung',
        'đường cao bá quát',
        'đường 23/10',
        'đường 2/9']
    for (let i = 0; i < areaName.length; i++) {

        const area = areaRepository.create({
            name: areaName[i],
        });
        areas.push(area);
    }

    await areaRepository.save(areas);
    console.log("✅", areaName.length,"fake areas inserted!");
}
