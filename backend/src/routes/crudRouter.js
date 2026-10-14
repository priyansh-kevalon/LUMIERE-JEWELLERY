import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { requireAdmin } from '../middleware/auth.js';

/**
 * Build a REST router for a Mongoose model.
 *
 * Supports a configurable key field (products/reviews use a numeric `id`,
 * categories/coupons a string key) so the JSON returned to the frontend keeps
 * exactly the shape it already expects.
 */
export function crudRouter({
  Model,
  key = 'id',
  keyType = 'auto',
  sort = null,
  readGuard = null,
  writeGuard = requireAdmin,
  assignKey = true,
}) {
  const router = Router();
  const cast = (value) => (keyType === 'number' ? Number(value) : value);
  const guards = (guard) => (guard ? [guard] : []);

  router.get('/', ...guards(readGuard), asyncHandler(async (req, res) => {
    let query = Model.find();
    if (sort) query = query.sort(sort);
    res.json(await query);
  }));

  router.get('/:key', ...guards(readGuard), asyncHandler(async (req, res) => {
    const doc = await Model.findOne({ [key]: cast(req.params.key) });
    if (!doc) throw ApiError.notFound(`${Model.modelName} not found`);
    res.json(doc);
  }));

  router.post('/', ...guards(writeGuard), asyncHandler(async (req, res) => {
    const body = { ...req.body };
    if (assignKey && body[key] == null && keyType === 'number') {
      const max = await Model.findOne().sort(`-${key}`);
      body[key] = max ? max[key] + 1 : 1;
    }
    const doc = await Model.create(body);
    res.status(201).json(doc);
  }));

  const update = asyncHandler(async (req, res) => {
    const doc = await Model.findOneAndUpdate(
      { [key]: cast(req.params.key) },
      { $set: req.body },
      { new: true, runValidators: true },
    );
    if (!doc) throw ApiError.notFound(`${Model.modelName} not found`);
    res.json(doc);
  });

  router.put('/:key', ...guards(writeGuard), update);
  router.patch('/:key', ...guards(writeGuard), update);

  router.delete('/:key', ...guards(writeGuard), asyncHandler(async (req, res) => {
    const doc = await Model.findOneAndDelete({ [key]: cast(req.params.key) });
    if (!doc) throw ApiError.notFound(`${Model.modelName} not found`);
    res.json({ ok: true });
  }));

  return router;
}
