import * as express from "express";
import * as cors from "cors";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerJsdoc from "swagger-jsdoc";
import swaggerOptions from "./config/swagger";
import userRouter from "./routes/userRouter";
import * as path from "path";
import productRouter from "./routes/ProductRouter";
import categoryRouter from "./routes/CategoryRouter";
import categoryParentRouter from "./routes/CategoryParentRouter";
import { AppDataSource } from "./config/database";
import authRouter from "./routes/AuthRouter";
import cartRouter from "./routes/CartRouter";
import orderRouter from "./routes/OrderRouter";
import provinceRouter from "./routes/ProvinceRouter";
import districtRouter from "./routes/DistrictRouter";
import momoRoutes from "./routes/momoRoutes";

const app = express();

// CORS configuration
const corsOptions = {
    origin: true, // cho phép tất cả các origins trong môi trường development
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Đảm bảo đường dẫn tệp tĩnh chính xác
const assetsPath = path.resolve(__dirname, '../src/assets');
console.log("Đường dẫn thư mục assets:", assetsPath);

// Cấu hình để phục vụ file tĩnh (ảnh) với logging
app.use('/assets', (req, res, next) => {
    console.log(`Yêu cầu tệp tĩnh: ${req.url}`);
    next();
}, express.static(assetsPath));

// Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes with /v1 prefix
app.use("/api/v1", userRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", categoryParentRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", provinceRouter);
app.use("/api/v1", districtRouter);
app.use("/api/v1", momoRoutes);
// Khởi động server
const PORT = process.env.PORT || 3000;

AppDataSource.then((dataSource) => {
    console.log("✅ Data Source has been initialized!");
    app.listen(PORT, () => {
        console.log(`✅ Server is running on port ${PORT}`);
        console.log(`✅ Assets được phục vụ từ: ${assetsPath}`);
    });
}).catch((error: Error) => {
    console.log("❌ Error during Data Source initialization:", error);
});