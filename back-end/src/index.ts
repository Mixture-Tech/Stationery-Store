import * as express from "express";
import * as cors from "cors";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerJsdoc from "swagger-jsdoc";
import swaggerOptions from "./config/swagger";
import userRouter from "./routes/userRouter";
import productRouter from "./routes/ProductRouter";
import categoryRouter from "./routes/CategoryRouter";
import categoryParentRouter from "./routes/CategoryParentRouter";
import { AppDataSource } from "./config/database";

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

// Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes with /v1 prefix
app.use("/api/v1", userRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", categoryParentRouter);

// Khởi động server
const PORT = process.env.PORT || 3000;

AppDataSource.then((dataSource) => {
    console.log("✅ Data Source has been initialized!");
    app.listen(PORT, () => {
        console.log(`✅ Server is running on port ${PORT}`);
    });
}).catch((error: Error) => {
    console.log("❌ Error during Data Source initialization:", error);
}); 
