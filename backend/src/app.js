import express from 'express';
import cors from 'cors';
import { CORS_ORIGIN } from './config/env.js';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middleware/error.js';

export function createApp() {
  const app = express();
  app.disable('x-powered-by');

  const allowed = CORS_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean);
  app.use(cors({ origin: allowed, credentials: true }));
  app.use(express.json({ limit: '5mb' }));

  app.use('/api', routes);

  app.use(notFound);
  app.use(errorHandler);
  return app;
}
