import 'reflect-metadata';
import './database';

import './shared/container';

import express from 'express';
import 'express-async-errors';

import cors from 'cors';

import { routes } from './routes';
import errorHandler from './errors/handler';

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);
app.use(errorHandler);

export { app };
