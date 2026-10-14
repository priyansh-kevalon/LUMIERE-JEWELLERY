import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

function tokenFrom(req) {
  const h = req.headers.authorization || '';
  if (h.startsWith('Bearer ')) return h.slice(7);
  return null;
}

export function requireAuth(req, res, next) {
  const token = tokenFrom(req);
  if (!token) return next(ApiError.unauthorized('Missing token'));
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    next(ApiError.unauthorized('Invalid token'));
  }
}

export function requireAdmin(req, res, next) {
  const token = tokenFrom(req);
  if (!token) return next(ApiError.unauthorized('Missing admin token'));
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.role !== 'admin') return next(ApiError.forbidden('Admin only'));
    req.admin = payload;
    next();
  } catch (e) {
    next(ApiError.unauthorized('Invalid admin token'));
  }
}
