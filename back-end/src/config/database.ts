import { DataSource } from "typeorm";
import { User } from "../entity/User";
import mysql from "mysql2/promise";
import { Role } from "../entity/Role";
import { Area } from "../entity/Area";
import { Category_Parent } from "../entity/Category_Parent";
import { Category } from "../entity/Category";
import { Province } from "../entity/Province";
import { Product } from "../entity/Product";
import { Cart } from "../entity/Cart";
import { Order_Detail } from "../entity/Order_Detail";
import { District } from "../entity/District";
import { Order } from "../entity/Order";

const DB_NAME = "stationery-store";

// Sử dụng biến toàn cục để lưu instance
let dataSourceInstance: DataSource | null = null;

export async function initializeDatabase(): Promise<DataSource> {
    // Nếu đã có instance, trả về luôn
    if (dataSourceInstance && dataSourceInstance.isInitialized) {
        return dataSourceInstance;
    }

    const connection = await mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    await connection.end();

    const dataSource = new DataSource({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        database: DB_NAME,
        synchronize: true, // Tự động đồng bộ schema
        dropSchema: false, // Không xóa schema cũ mỗi khi khởi động (nên dùng trong production)
        logging: true,
        entities: [User, Role, Area, Category_Parent, Category, Province, District, Order, Product, Order_Detail, Cart],
        migrations: [],
        subscribers: [],
    });

    await dataSource.initialize();
    dataSourceInstance = dataSource;
    return dataSource;
}

// Export DataSource dưới dạng Promise
export const AppDataSource = initializeDatabase();
