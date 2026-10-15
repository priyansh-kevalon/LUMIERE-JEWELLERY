import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendRoot = path.resolve(__dirname, '..', '..');

/*
 * Load `backend/.env` explicitly (by absolute path) so the connection string
 * is picked up no matter which directory the server is started from.
 *
 * ── To use YOUR OWN database ─────────────────────────────────────────────
 * Open `backend/.env` and set MONGODB_URI to your connection string, e.g.
 *   Local:  MONGODB_URI=mongodb://127.0.0.1:27017/lumiere
 *   Atlas:  MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/lumiere?retryWrites=true&w=majority
 * A real environment variable (set in the shell / host) always wins over .env.
 * ─────────────────────────────────────────────────────────────────────────
 */
dotenv.config({ path: path.join(backendRoot, '.env') });

const pick = (value, fallback) => (value && String(value).trim()) || fallback;

export const PORT = Number(pick(process.env.PORT, '4000'));
export const MONGODB_URI = pick(process.env.MONGODB_URI, 'mongodb://127.0.0.1:27017/lumiere');
export const JWT_SECRET = pick(process.env.JWT_SECRET, 'lumiere-dev-secret-change-me');
export const JWT_EXPIRES_IN = pick(process.env.JWT_EXPIRES_IN, '7d');
export const CORS_ORIGIN = pick(
  process.env.CORS_ORIGIN,
  'http://localhost:5173,http://localhost:5174,http://localhost:4000',
);

/* ------------------------------- payments ----------------------------- */
/* Razorpay credentials. The key id is public and may be shared with the
   storefront; the secret is only ever used on the server and must never be
   exposed to the browser or committed. Empty values simply disable the online
   payment option — checkout keeps working with Cash on Delivery. */
export const RAZORPAY_KEY_ID = pick(process.env.RAZORPAY_KEY_ID, '');
export const RAZORPAY_KEY_SECRET = pick(process.env.RAZORPAY_KEY_SECRET, '');
export const RAZORPAY_WEBHOOK_SECRET = pick(process.env.RAZORPAY_WEBHOOK_SECRET, '');
export const CURRENCY = pick(process.env.CURRENCY, 'INR');
export const COD_ENABLED = pick(process.env.COD_ENABLED, 'true').toLowerCase() !== 'false';

export const NODE_ENV = pick(process.env.NODE_ENV, 'development');

/** Mask credentials so the connection target can be logged safely. */
export function describeMongoUri(uri) {
  try {
    const parsed = new URL(uri);
    if (parsed.password) parsed.password = '****';
    return parsed.toString();
  } catch {
    return String(uri).replace(/\/\/[^@/]*@/, '//****:****@');
  }
}
