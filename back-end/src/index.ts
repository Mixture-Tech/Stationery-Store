import express, {Request, Response} from 'express';
import path from 'path';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import { AppDataSource } from "./config/database";
import { ApiPath } from "./const/ApiPath";
import userRoutes from "./routes/userRouter";
dotenv.config();

const app = express();

// configuration

if (process.env.NODE_ENV === 'dev') {
    const envPath = path.resolve(__dirname, `../env/${process.env.NODE_ENV}.env`) ;
    dotenv.config({ path: envPath });
  } else {
    const envPath = path.resolve(__dirname, `env/${process.env.NODE_ENV}.env`);
    dotenv.config({ path: envPath });
  }
  
const port = process.env.PORT || 3000;

app.use(express.json());

AppDataSource.then(dataSource => {
  dataSource.initialize().then(() => {
      console.log("✅ Kết nối Database thành công!");
  }).catch(err => console.error("❌ Lỗi kết nối Database:", err));
});

app.use(ApiPath.BaseApi, userRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
}); 