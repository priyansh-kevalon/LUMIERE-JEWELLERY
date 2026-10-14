import { Router } from 'express';
import { Setting } from '../models/Setting.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

async function getSettings() {
  let doc = await Setting.findOne({ key: 'main' });
  if (!doc) doc = await Setting.create({ key: 'main' });
  return doc;
}

/* GET /api/settings — public */
router.get('/', asyncHandler(async (req, res) => {
  res.json(await getSettings());
}));

/* PUT /api/settings — admin */
router.put('/', requireAdmin, asyncHandler(async (req, res) => {
  const doc = await Setting.findOneAndUpdate(
    { key: 'main' },
    { $set: { ...req.body, key: 'main' } },
    { new: true, upsert: true, runValidators: true },
  );
  res.json(doc);
}));

export default router;
