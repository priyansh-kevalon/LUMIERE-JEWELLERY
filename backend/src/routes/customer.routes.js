import { Router } from 'express';
import { Order } from '../models/Order.js';
import { User } from '../models/User.js';
import { requireAdmin } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { buildCustomers } from '../utils/customers.js';

const router = Router();

/* GET /api/customers — admin. Derived from registered users + orders. */
router.get('/', requireAdmin, asyncHandler(async (req, res) => {
  const [orders, users] = await Promise.all([Order.find({}).lean(), User.find({}).lean()]);
  res.json(buildCustomers(orders, users));
}));

export default router;
