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
  /* Keep the raw request body around so the Razorpay webhook can verify the
     signature against the exact bytes Razorpay signed. */
  app.use(express.json({
    limit: '5mb',
    verify: (req, res, buf) => { req.rawBody = buf; },
  }));

  app.use('/api', routes);

  app.use(notFound);
  app.use(errorHandler);
  return app;
}
