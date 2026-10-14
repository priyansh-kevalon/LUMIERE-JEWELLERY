import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
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

export default router;
