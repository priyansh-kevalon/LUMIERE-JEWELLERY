export class ApiError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
    this.name = 'ApiError';
  }
  static badRequest(m) { return new ApiError(400, m); }
  static unauthorized(m) { return new ApiError(401, m); }
  static forbidden(m) { return new ApiError(403, m); }
  static notFound(m) { return new ApiError(404, m); }
  static conflict(m) { return new ApiError(409, m); }
}
