import { Router } from 'express';
import { NewsletterSubscriber } from '../models/Contact.js';
import { requireAdmin } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

const router = Router();

/* GET /api/newsletter — admin. All newsletter subscribers, newest first. */
router.get('/', requireAdmin, asyncHandler(async (req, res) => {
  const subscribers = await NewsletterSubscriber.find({}).sort({ createdAt: -1 }).lean();
  res.json(subscribers);
}));

/* POST /api/newsletter — subscribe an email. */
router.post('/', asyncHandler(async (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase();
  if (!email) throw ApiError.badRequest('email is required');

  const existing = await NewsletterSubscriber.findOne({ email });
  if (!existing) await NewsletterSubscriber.create({ email, createdAt: Date.now() });

  res.status(201).json({ ok: true });
}));

export default router;
