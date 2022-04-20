import 'dotenv/config';
import 'reflect-metadata';

import '@shared/container'

import express from 'express';
import cors from 'cors';

import routes from '@shared/http/routes';

const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: 'localhost',
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(routes);

const { PORT } = process.env;
app.listen(PORT || 3333, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running!\n${process.env.BASE_URL}:${PORT || 3333}`);
});