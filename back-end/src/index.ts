import express, {Request, Response} from 'express';
import path from 'path';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
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

app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!');
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
}); 