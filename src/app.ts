import express from 'express';
import 'dotenv/config'; 
import { routes } from './routes';

const app = express();
app.use(express.json());


const apiBasePath = process.env.API_BASE_PATH || '/food/v1'; 
app.use(apiBasePath, routes);

const port = process.env.PORT || 3000; 

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

export { app };
