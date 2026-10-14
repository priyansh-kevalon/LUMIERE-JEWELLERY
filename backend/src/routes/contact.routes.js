import { Router } from 'express';
import { ContactMessage } from '../models/Contact.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

const router = Router();

/* POST /api/contact — store a contact-form submission. */
router.post('/', asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body || {};
  if (!name || !email || !message) throw ApiError.badRequest('name, email and message are required');

  const doc = await ContactMessage.create({
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    phone: phone ? String(phone).trim() : '',
    subject: subject ? String(subject).trim() : '',
    message: String(message),
    createdAt: Date.now(),
  });

  res.status(201).json({ ok: true, id: doc._id });
}));

export default router;
