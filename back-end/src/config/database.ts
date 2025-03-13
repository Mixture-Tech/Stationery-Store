import { DataSource } from "typeorm";
import { User } from "../entity/user";
import mysql from "mysql2/promise";

const DB_NAME = "stationery-store";

async function initializeDatabase() {
    const connection = await mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    await connection.end();

    return new DataSource({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        database: DB_NAME,
        synchronize: true,
        logging: true,
        entities: [User],
        migrations: [],
        subscribers: [],
    });
}

// Sử dụng hàm async để khởi tạo database
export const AppDataSource = initializeDatabase();
