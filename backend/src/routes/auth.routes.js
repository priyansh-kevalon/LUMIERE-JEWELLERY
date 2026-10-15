import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { requireAuth } from '../middleware/auth.js';
import { NODE_ENV } from '../config/env.js';
import { signUserToken, publicUser } from '../utils/tokens.js';

const router = Router();

/* POST /api/auth/register -> { user, token } */
router.post('/register', asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body || {};
  if (!name || !email || !password) throw ApiError.badRequest('name, email and password are required');

  const normalized = String(email).trim().toLowerCase();
  const exists = await User.findOne({ email: normalized });
  if (exists) throw ApiError.conflict('email-in-use');

  const password_hash = await bcrypt.hash(String(password), 10);
  const user = await User.create({
    name: String(name).trim(),
    email: normalized,
    phone: phone ? String(phone).trim() : '',
    password: password_hash,
    createdAt: Date.now(),
  });

  res.status(201).json({ user: publicUser(user), token: signUserToken(user) });
}));

/* POST /api/auth/login -> { user, token } */
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};
  const normalized = String(email || '').trim().toLowerCase();
  const user = await User.findOne({ email: normalized });
  if (!user) throw ApiError.unauthorized('invalid-credentials');

  const ok = await bcrypt.compare(String(password || ''), user.password);
  if (!ok) throw ApiError.unauthorized('invalid-credentials');

  res.json({ user: publicUser(user), token: signUserToken(user) });
}));

/* POST /api/auth/forgot-password -> { email, code, expiresInMinutes } */
router.post('/forgot-password', asyncHandler(async (req, res) => {
  const { email } = req.body || {};
  const normalized = String(email || '').trim().toLowerCase();
  if (!normalized) throw ApiError.badRequest('email is required');

  const user = await User.findOne({ email: normalized });
  if (!user) throw ApiError.notFound('email-not-found');

  const code = String(Math.floor(100000 + Math.random() * 900000));
  user.resetCode = code;
  user.resetCodeExpires = Date.now() + 15 * 60 * 1000;
  await user.save();

  /* No mail provider is wired up yet, so the code is only echoed back in
     non-production. In production this must instead be emailed to the user. */
  const payload = { email: normalized, expiresInMinutes: 15 };
  if (NODE_ENV !== 'production') payload.code = code;
  res.json(payload);
}));

/* POST /api/auth/reset-password -> { ok, email } */
router.post('/reset-password', asyncHandler(async (req, res) => {
  const { email, code, password } = req.body || {};
  const normalized = String(email || '').trim().toLowerCase();
  if (!normalized || !code || !password) throw ApiError.badRequest('email, code and password are required');
  if (String(password).length < 8) throw ApiError.badRequest('Password must be at least 8 characters');

  const user = await User.findOne({ email: normalized });
  if (!user || !user.resetCode) throw ApiError.badRequest('invalid-code');

  if (user.resetCodeExpires && user.resetCodeExpires < Date.now()) {
    user.resetCode = undefined;
    user.resetCodeExpires = undefined;
    await user.save();
    throw ApiError.badRequest('expired-code');
  }
  if (String(code).trim() !== String(user.resetCode)) throw ApiError.badRequest('invalid-code');

  user.password = await bcrypt.hash(String(password), 10);
  user.resetCode = undefined;
  user.resetCodeExpires = undefined;
  await user.save();

  res.json({ ok: true, email: normalized });
}));

/* GET /api/auth/me -> { user } (current signed-in user) */
router.get('/me', requireAuth, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.sub);
  if (!user) throw ApiError.notFound('User not found');
  res.json({ user: publicUser(user) });
}));

/* PATCH /api/auth/me -> { user } (update name / phone) */
router.patch('/me', requireAuth, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.sub);
  if (!user) throw ApiError.notFound('User not found');

  const { name, phone } = req.body || {};
  if (typeof name === 'string' && name.trim()) user.name = name.trim();
  if (typeof phone === 'string') user.phone = phone.trim();
  await user.save();

  res.json({ user: publicUser(user) });
}));

export default router;
