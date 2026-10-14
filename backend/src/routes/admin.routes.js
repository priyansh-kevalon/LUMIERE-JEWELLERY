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
  res.json({ email: req.admin.email, name: req.admin.name, role: req.admin.role });
}));

export default router;
