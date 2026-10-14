import { Router } from 'express';
import { Order } from '../models/Order.js';
import { Setting } from '../models/Setting.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

const router = Router();

function nextOrderId(orders) {
  let max = 1000;
  for (const order of orders) {
    const match = /(\d+)$/.exec(order.id || '');
    if (match) max = Math.max(max, Number(match[1]));
  }
  return `LM-${max + 1}`;
}

/* POST /api/checkout — create an order from the cart. */
router.post('/', asyncHandler(async (req, res) => {
  const { items, customer = {}, address = {}, paymentMethod = '' } = req.body || {};
  if (!Array.isArray(items) || items.length === 0) throw ApiError.badRequest('items are required');

  const setting = await Setting.findOne({ key: 'main' }).lean();
  const gstRate = setting?.gstRate ?? 18;
  const freeThreshold = setting?.freeShippingThreshold ?? 50000;

  const subtotal = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0);
  const tax = Math.round(subtotal * (gstRate / 100));
  const shipping = subtotal >= freeThreshold ? 0 : 300;
  const total = subtotal + tax + shipping;

  const existing = await Order.find({}, { id: 1 }).lean();
  const id = nextOrderId(existing);

  const order = await Order.create({
    id,
    customer,
    items,
    subtotal,
    shipping,
    tax,
    total,
    status: 'pending',
    payment: 'pending',
    paymentMethod,
    createdAt: Date.now(),
    address,
  });

  res.status(201).json({ orderId: order.id, total: order.total, url: null });
}));

export default router;
