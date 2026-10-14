import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';

export function signUserToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email, name: user.name, role: 'user' },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );
}

export function signAdminToken(admin) {
  return jwt.sign(
    { sub: admin._id.toString(), email: admin.email, name: admin.name, role: 'admin' },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );
}

export const publicUser = (user) => ({
  name: user.name || '',
  email: user.email || '',
  phone: user.phone || '',
  createdAt: user.createdAt || null,
});
