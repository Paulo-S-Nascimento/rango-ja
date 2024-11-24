import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { routes } from './routes';

const app = express();

app.use(cors());

app.use(express.json());

const apiBasePath = process.env.API_BASE_PATH || '/food/v1';
app.use(apiBasePath, routes);

export { app };