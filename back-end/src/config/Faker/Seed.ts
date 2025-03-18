import { AppDataSource } from "../database";
import { seedAreas } from "./SeedArea";
import { seedCarts } from "./SeedCart";
import { seedCategory_Parents } from "./SeedCategory_Parent";
import { seedCategories } from "./SeedCateogry";
import { seedDistricts } from "./SeedDistrict";
import { seedOrderDetails } from "./SeedOrder_Detail";
import { seedOrders } from "./SeedOrders";
import { seedProducts } from "./SeedProducts";
import { seedProvinces } from "./SeedProvince";
import { seedRoles } from "./SeedRole";
import { seedUsers } from "./SeedUsers";

async function runSeed() {
    console.log("🌱 Seeding database...");

    // Chờ `AppDataSource` khởi tạo xong
    const dataSource = await AppDataSource;
    await seedRoles(dataSource);    
    await seedUsers(dataSource);

    await seedAreas(dataSource); 
    await seedProvinces(dataSource);    
    await seedDistricts(dataSource);    

    await seedCategory_Parents(dataSource);    
    await seedCategories(dataSource);    

    await seedProducts(dataSource);    
    await seedOrders(dataSource);    

    await seedOrderDetails(dataSource);    
    
    await seedCarts(dataSource);    

    console.log("✅ Seeding complete!");
    process.exit();
}

runSeed().catch((error) => console.log("❌ Seed error:", error));
