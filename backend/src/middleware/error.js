import { ApiError } from '../utils/ApiError.js';
import { NODE_ENV } from '../config/env.js';

export function notFound(req, res, next) {
  next(new ApiError(404, `Not found: ${req.method} ${req.originalUrl}`));
}

export function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  const payload = { message: err.message || 'Server error' };
  if (err.name === 'ValidationError') {
    payload.message = 'Validation failed';
    payload.details = err.errors;
  }
  if (err.code === 11000) {
    payload.message = 'Duplicate key';
  }
  if (NODE_ENV !== 'production' && status >= 500) {
    console.error(err);
  }
  res.status(status).json(payload);
}
