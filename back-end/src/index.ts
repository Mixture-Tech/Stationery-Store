import express = require('express');
import * as path from 'path';
import { config } from 'dotenv';
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
import { AppDataSource } from "./config/database";
import { ApiPath } from "./const/ApiPath";
import userRoutes from "./routes/UserRouter";
import productRoutes from "./routes/ProductRouter";

// Cấu hình dotenv
const envPath = path.resolve(__dirname, '../.env');
config({ path: envPath });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Khởi tạo kết nối database
AppDataSource
  .then(() => {
      console.log("✅ Kết nối Database thành công!");
  })
  .catch(err => console.error("❌ Lỗi kết nối Database:", err));

app.use("", userRoutes);
app.use("", productRoutes);

// Cấu hình Swagger
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
}); 