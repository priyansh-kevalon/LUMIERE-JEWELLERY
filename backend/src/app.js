import express from 'express';
import cors from 'cors';
import { CORS_ORIGIN } from './config/env.js';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middleware/error.js';

const allowlist = CORS_ORIGIN.split(',')
  .map((origin) => origin.trim().replace(/\/+$/, ''))
  .filter(Boolean);
const allowWildcard = allowlist.includes('*');

/* Allow the configured origins, any localhost port (dev), and any Render
   subdomain so a deployed frontend works without hardcoding its exact host. */
function isAllowedOrigin(origin) {
  if (allowWildcard || allowlist.includes(origin)) return true;
  try {
    const { hostname, protocol } = new URL(origin);
    if (hostname === 'localhost' || hostname === '127.0.0.1') return true;
    if (protocol === 'https:' && hostname.endsWith('.onrender.com')) return true;
  } catch {
    return false;
  }
  return false;
}

export function createApp() {
  const app = express();
  app.disable('x-powered-by');

  app.use(cors({
    origin(origin, callback) {
      /* No Origin header (curl, server-to-server, same-origin) — allow. */
      callback(null, !origin || isAllowedOrigin(origin));
    },
    credentials: true,
  }));
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
