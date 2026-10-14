import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { Admin } from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { signAdminToken } from '../utils/tokens.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

/* POST /api/admin/auth/login -> admin session { email, name, role, token } */
router.post('/auth/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};
  const normalized = String(email || '').trim().toLowerCase();
  const admin = await Admin.findOne({ email: normalized });
  if (!admin) throw ApiError.unauthorized('invalid-credentials');

  const ok = await bcrypt.compare(String(password || ''), admin.password);
  if (!ok) throw ApiError.unauthorized('invalid-credentials');

  res.json({
    email: admin.email,
    name: admin.name,
    role: admin.role,
    token: signAdminToken(admin),
    signedInAt: Date.now(),
  });
}));

/* GET /api/admin/me -> current admin (requires token) */
router.get('/me', requireAdmin, asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.sub);
  if (!admin) throw ApiError.unauthorized('Admin not found');
  res.json({ email: admin.email, name: admin.name, role: admin.role, createdAt: admin.createdAt });
}));

/* PATCH /api/admin/me -> update admin profile (name, email) */
router.patch('/me', requireAdmin, asyncHandler(async (req, res) => {
  const { name, email } = req.body || {};
  const admin = await Admin.findById(req.admin.sub);
  if (!admin) throw ApiError.unauthorized('Admin not found');

  if (name != null) {
    const trimmed = String(name).trim();
    if (!trimmed) throw ApiError.badRequest('Name is required');
    admin.name = trimmed;
  }

  if (email != null) {
    const normalized = String(email).trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      throw ApiError.badRequest('Enter a valid email address');
    }
    const existing = await Admin.findOne({ email: normalized, _id: { $ne: admin._id } });
    if (existing) throw ApiError.conflict('That email is already in use');
    admin.email = normalized;
  }

  await admin.save();

  res.json({
    email: admin.email,
    name: admin.name,
    role: admin.role,
    token: signAdminToken(admin),
  });
}));

/* POST /api/admin/me/password -> change admin password */
router.post('/me/password', requireAdmin, asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  const admin = await Admin.findById(req.admin.sub);
  if (!admin) throw ApiError.unauthorized('Admin not found');

  const ok = await bcrypt.compare(String(currentPassword || ''), admin.password);
  if (!ok) throw ApiError.badRequest('Current password is incorrect');

  const next = String(newPassword || '');
  if (next.length < 6) throw ApiError.badRequest('New password must be at least 6 characters');

  admin.password = await bcrypt.hash(next, 10);
  await admin.save();

  res.json({ ok: true });
}));

export default router;
