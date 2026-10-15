import { Router } from 'express';
import crypto from 'node:crypto';
import Razorpay from 'razorpay';
import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { Coupon } from '../models/Coupon.js';
import { Setting } from '../models/Setting.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { requireAuth } from '../middleware/auth.js';
import {
  RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET,
  RAZORPAY_WEBHOOK_SECRET,
  CURRENCY,
  COD_ENABLED,
} from '../config/env.js';

const router = Router();

const round = (value) => Math.max(0, Math.round(Number(value) || 0));
const razorpayEnabled = Boolean(RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET);

/* Lazily construct the server-side Razorpay SDK client. The secret never
   leaves the backend. */
let razorpayClient = null;
function getRazorpay() {
  if (!razorpayEnabled) return null;
  if (!razorpayClient) {
    razorpayClient = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });
  }
  return razorpayClient;
}

async function loadPricing() {
  const setting = await Setting.findOne({ key: 'main' }).lean();
  const gstRate = Number(setting?.gstRate ?? 18);
  const freeShippingThreshold = Number(setting?.freeShippingThreshold ?? 50000);
  const shippingFee = Number(setting?.shippingFee ?? 300);
  return { gstRate, freeShippingThreshold, shippingFee };
}

/**
 * Validate the client cart, then re-price every line from the database and
 * re-check availability. The client only ever supplies product ids, variants
 * and quantities — never prices.
 */
async function resolveCart(rawItems) {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    throw ApiError.badRequest('Your cart is empty');
  }
  if (rawItems.length > 50) throw ApiError.badRequest('Too many items in the cart');

  const wanted = new Map(); /* "id|size|metal" -> { id, qty, size, metal } */
  for (const raw of rawItems) {
    const id = Number(raw?.id);
    const qty = Math.floor(Number(raw?.qty));
    if (!Number.isInteger(id) || id <= 0) throw ApiError.badRequest('Invalid product in cart');
    if (!Number.isInteger(qty) || qty <= 0) throw ApiError.badRequest('Invalid quantity in cart');
    if (qty > 50) throw ApiError.badRequest('Quantity exceeds the per-order limit');

    const size = raw.size != null ? String(raw.size).slice(0, 40) : null;
    const metal = raw.metal != null ? String(raw.metal).slice(0, 40) : null;
    const key = `${id}|${size ?? ''}|${metal ?? ''}`;
    const entry = wanted.get(key) || { id, qty: 0, size, metal };
    entry.qty += qty;
    wanted.set(key, entry);
  }

  /* Stock is finite per product, so validate the combined quantity across all
     of its variants. */
  const qtyByProduct = new Map();
  for (const entry of wanted.values()) {
    qtyByProduct.set(entry.id, (qtyByProduct.get(entry.id) || 0) + entry.qty);
  }

  const products = await Product.find({ id: { $in: [...qtyByProduct.keys()] } });
  const byId = new Map(products.map((p) => [p.id, p]));

  for (const [id, qty] of qtyByProduct) {
    const product = byId.get(id);
    if (!product || product.active === false) {
      throw ApiError.badRequest('A product in your cart is no longer available');
    }
    const madeToOrder = String(product.availability || '').toLowerCase() === 'made to order';
    if (!madeToOrder && Number(product.stock || 0) < qty) {
      throw ApiError.badRequest(`${product.name} is out of stock for the requested quantity`);
    }
  }

  const lines = [];
  for (const entry of wanted.values()) {
    const product = byId.get(entry.id);
    lines.push({
      id: product.id,
      name: product.name,
      price: round(product.price),
      qty: entry.qty,
      image: product.image || '',
      size: entry.size,
      metal: entry.metal,
    });
  }

  return lines;
}

/** Validate a coupon against the trusted subtotal and return the discount. */
async function resolveCoupon(code, subtotal, userId) {
  if (!code) return { discount: 0, couponCode: undefined };
  const normalized = String(code).trim().toUpperCase();
  if (!normalized) return { discount: 0, couponCode: undefined };

  const coupon = await Coupon.findOne({ code: normalized });
  if (!coupon || coupon.active === false) throw ApiError.badRequest('This coupon is not valid');
  if (Number(coupon.minOrder || 0) > subtotal) {
    throw ApiError.badRequest('This coupon needs a higher order value');
  }
  if (coupon.usageLimit != null && Number(coupon.used || 0) >= Number(coupon.usageLimit)) {
    throw ApiError.badRequest('This coupon has reached its usage limit');
  }
  if (coupon.firstOrderOnly) {
    const prior = await Order.countDocuments({ user: userId });
    if (prior > 0) throw ApiError.badRequest('This coupon is valid on your first order only');
  }

  const raw = coupon.type === 'fixed'
    ? Number(coupon.value || 0)
    : subtotal * (Number(coupon.value || 0) / 100);
  return { discount: Math.min(round(raw), subtotal), couponCode: normalized };
}

function nextOrderId(orders) {
  let max = 1000;
  for (const order of orders) {
    const match = /(\d+)$/.exec(order.id || '');
    if (match) max = Math.max(max, Number(match[1]));
  }
  return `LM-${max + 1}`;
}

/** Reduce stock exactly once per order, even across payment retries or
    concurrent verify/webhook callbacks, and consume the coupon once. */
async function applyStockOnce(order) {
  if (order.stockReduced) return order;

  /* Atomically claim the reservation so two concurrent callbacks can never
     both decrement stock. */
  const claimed = await Order.findOneAndUpdate(
    { _id: order._id, stockReduced: { $ne: true } },
    { $set: { stockReduced: true, updatedAt: Date.now() } },
    { new: false },
  );
  if (!claimed) {
    order.stockReduced = true;
    return order;
  }

  const qtyById = new Map();
  for (const item of order.items) {
    qtyById.set(item.id, (qtyById.get(item.id) || 0) + Number(item.qty || 0));
  }

  await Promise.all([...qtyById].map(async ([id, qty]) => {
    const product = await Product.findOne({ id }).select('availability').lean();
    const madeToOrder = String(product?.availability || '').toLowerCase() === 'made to order';
    if (!madeToOrder) {
      /* Guard against overselling under concurrency: only decrement if enough
         stock is still available. */
      await Product.updateOne({ id, stock: { $gte: qty } }, { $inc: { stock: -qty } });
    }
  }));

  if (order.couponCode) {
    await Coupon.updateOne({ code: order.couponCode }, { $inc: { used: 1 } });
  }

  order.stockReduced = true;
  order.updatedAt = Date.now();
  return order;
}

/* POST /api/checkout/config — public payment/checkout capabilities. */
router.get('/config', asyncHandler(async (req, res) => {
  const { gstRate, freeShippingThreshold, shippingFee } = await loadPricing();
  res.json({
    currency: CURRENCY,
    codEnabled: COD_ENABLED,
    razorpayEnabled,
    keyId: razorpayEnabled ? RAZORPAY_KEY_ID : null,
    gstRate,
    freeShippingThreshold,
    shippingFee,
  });
}));

/* POST /api/checkout — create an order from the cart. */
router.post('/', requireAuth, asyncHandler(async (req, res) => {
  const body = req.body || {};
  const lines = await resolveCart(body.items);

  const rawCustomer = body.customer && typeof body.customer === 'object' ? body.customer : {};
  const rawAddress = body.address && typeof body.address === 'object' ? body.address : {};

  const customer = {
    name: String(rawCustomer.name || '').trim(),
    email: String(rawCustomer.email || '').trim().toLowerCase(),
    phone: String(rawCustomer.phone || '').trim(),
  };
  if (!customer.name) throw ApiError.badRequest('Please enter your full name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
    throw ApiError.badRequest('Enter a valid email address');
  }
  if (!/^[0-9]{8,15}$/.test(customer.phone.replace(/\D/g, ''))) {
    throw ApiError.badRequest('Enter a valid mobile number');
  }

  const address = {
    line1: String(rawAddress.line1 || '').trim(),
    line2: String(rawAddress.line2 || '').trim(),
    city: String(rawAddress.city || '').trim(),
    state: String(rawAddress.state || '').trim(),
    pincode: String(rawAddress.pincode || '').trim(),
    country: String(rawAddress.country || 'India').trim() || 'India',
  };
  if (!address.line1 || !address.city || !address.state) {
    throw ApiError.badRequest('Please complete the shipping address');
  }
  if (!/^\d{4,10}$/.test(address.pincode)) throw ApiError.badRequest('Enter a valid PIN code');

  /* COD is offline; UPI / CARD (and the legacy generic RAZORPAY) are settled
     through Razorpay Checkout, which routes to the chosen channel. */
  const ONLINE_METHODS = ['UPI', 'CARD', 'RAZORPAY'];
  const paymentMethod = String(req.body?.paymentMethod || '').trim().toUpperCase();
  const isOnline = ONLINE_METHODS.includes(paymentMethod);
  if (paymentMethod !== 'COD' && !isOnline) {
    throw ApiError.badRequest('Choose a valid payment method');
  }
  if (paymentMethod === 'COD' && !COD_ENABLED) {
    throw ApiError.badRequest('Cash on delivery is currently unavailable');
  }
  /* When no gateway keys are configured, online methods fall back to the demo
     simulator so the checkout can be exercised end to end. */

  const subtotal = lines.reduce((sum, line) => sum + line.price * line.qty, 0);
  const { gstRate, freeShippingThreshold, shippingFee } = await loadPricing();
  const { discount, couponCode } = await resolveCoupon(req.body?.couponCode, subtotal, req.user.sub);
  const taxable = Math.max(0, subtotal - discount);
  const tax = round(taxable * (gstRate / 100));
  const shipping = subtotal >= freeShippingThreshold ? 0 : round(shippingFee);
  const total = taxable + tax + shipping;

  /* Allocate an order number, retrying if a concurrent request wins the race
     against the unique index on `id`. */
  let order = null;
  for (let attempt = 0; attempt < 6 && !order; attempt += 1) {
    const id = nextOrderId(await Order.find({}, { id: 1 }).lean());
    try {
      order = await Order.create({
        id,
        user: req.user.sub,
        customer,
        items: lines,
        subtotal,
        shipping,
        tax,
        discount,
        total,
        couponCode,
        status: 'pending',
        payment: 'pending',
        paymentMethod,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        address,
        stockReduced: false,
      });
    } catch (error) {
      if (error.code !== 11000) throw error;
    }
  }
  if (!order) throw new ApiError(500, 'Could not allocate an order number');

  if (isOnline && razorpayEnabled) {
    try {
      const rzOrder = await getRazorpay().orders.create({
        amount: Math.max(100, total * 100), /* Razorpay needs paise */
        currency: CURRENCY,
        receipt: order.id,
        notes: { orderId: order.id, method: paymentMethod },
      });
      order.razorpayOrderId = rzOrder.id;
      order.updatedAt = Date.now();
      await order.save();

      return res.status(201).json({
        order: order.toJSON(),
        orderId: order.id,
        total: order.total,
        razorpay: {
          keyId: RAZORPAY_KEY_ID,
          orderId: rzOrder.id,
          amount: rzOrder.amount,
          currency: CURRENCY,
          method: paymentMethod,
          name: 'LUMIÈRE JEWELLERY',
          description: `Order ${order.id}`,
          prefill: {
            name: order.customer.name,
            email: order.customer.email,
            contact: order.customer.phone,
          },
        },
      });
    } catch (error) {
      /* Do not leave an unpayable order behind. */
      await Order.deleteOne({ _id: order._id });
      throw ApiError.badRequest('Could not start the online payment. Please try again.');
    }
  }

  /* Simulated online payment (demo mode — no gateway configured). The card /
     UPI details entered by the customer are never sent to or stored by the
     backend; only the resulting "paid" state is recorded. */
  if (isOnline) {
    order.demoPayment = true;
    order.payment = 'paid';
    order.status = 'confirmed';
    order.updatedAt = Date.now();
    await order.save();
  }

  /* Cash on delivery / demo payment — reserve stock now that the order is placed. */
  await applyStockOnce(order);
  res.status(201).json({
    order: order.toJSON(),
    orderId: order.id,
    total: order.total,
    razorpay: null,
    simulated: isOnline,
  });
}));

/* POST /api/checkout/coupon — preview a coupon against an estimated subtotal.
   The final discount is always recomputed when the order is created. */
router.post('/coupon', requireAuth, asyncHandler(async (req, res) => {
  const subtotal = round(req.body?.subtotal);
  try {
    const { discount, couponCode } = await resolveCoupon(req.body?.code, subtotal, req.user.sub);
    if (!couponCode) return res.json({ valid: false, message: 'Enter a coupon code' });
    res.json({ valid: true, couponCode, discount });
  } catch (error) {
    res.json({ valid: false, message: error.message || 'This coupon is not valid' });
  }
}));

/* POST /api/checkout/razorpay/verify — verify the payment signature server-side. */
router.post('/razorpay/verify', requireAuth, asyncHandler(async (req, res) => {
  const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body || {};
  if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    throw ApiError.badRequest('Incomplete payment details');
  }
  if (!razorpayEnabled) throw ApiError.badRequest('Online payment is not configured');

  const order = await Order.findOne({ id: String(orderId) });
  if (!order) throw ApiError.notFound('Order not found');
  if (!order.user || String(order.user) !== String(req.user.sub)) {
    throw ApiError.notFound('Order not found');
  }
  if (order.razorpayOrderId && order.razorpayOrderId !== razorpayOrderId) {
    throw ApiError.badRequest('Payment does not match this order');
  }

  const expected = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex');

  const expectedBuf = Buffer.from(expected);
  const providedBuf = Buffer.from(String(razorpaySignature));
  const valid = expectedBuf.length === providedBuf.length
    && crypto.timingSafeEqual(expectedBuf, providedBuf);

  if (!valid) {
    order.payment = 'failed';
    order.updatedAt = Date.now();
    await order.save();
    throw ApiError.badRequest('Payment verification failed');
  }

  /* Idempotent — safe after a retry or a duplicate callback. */
  if (order.payment !== 'paid') {
    order.payment = 'paid';
    order.status = 'confirmed';
    order.razorpayPaymentId = razorpayPaymentId;
    order.updatedAt = Date.now();
    await order.save();
  }
  await applyStockOnce(order);

  res.json({ ok: true, order: order.toJSON() });
}));

/* POST /api/checkout/razorpay/webhook — signature-verified payment updates. */
router.post('/razorpay/webhook', asyncHandler(async (req, res) => {
  if (!RAZORPAY_WEBHOOK_SECRET) {
    /* Not configured — acknowledge so Razorpay does not keep retrying. */
    return res.status(200).json({ ok: true, configured: false });
  }

  const signature = req.headers['x-razorpay-signature'];
  const raw = req.rawBody ? req.rawBody.toString('utf8') : JSON.stringify(req.body || {});
  const expected = crypto.createHmac('sha256', RAZORPAY_WEBHOOK_SECRET).update(raw).digest('hex');
  const expectedBuf = Buffer.from(expected);
  const providedBuf = Buffer.from(String(signature || ''));
  const valid = Boolean(signature)
    && expectedBuf.length === providedBuf.length
    && crypto.timingSafeEqual(expectedBuf, providedBuf);
  if (!valid) return res.status(400).json({ message: 'Invalid signature' });

  const event = req.body?.event;
  const entity = req.body?.payload?.payment?.entity || req.body?.payload?.order?.entity || {};
  const rzOrderId = entity.order_id || entity.id;

  if (rzOrderId && ['payment.captured', 'order.paid', 'payment.authorized'].includes(event)) {
    const order = await Order.findOne({ razorpayOrderId: rzOrderId });
    if (order && order.payment !== 'paid') {
      order.payment = 'paid';
      order.status = 'confirmed';
      if (entity.id && /^pay_/.test(entity.id)) order.razorpayPaymentId = entity.id;
      order.updatedAt = Date.now();
      await order.save();
      await applyStockOnce(order);
    }
  }

  if (rzOrderId && event === 'payment.failed') {
    const order = await Order.findOne({ razorpayOrderId: rzOrderId });
    if (order && order.payment === 'pending') {
      order.payment = 'failed';
      order.updatedAt = Date.now();
      await order.save();
    }
  }

  res.json({ ok: true });
}));

/* GET /api/checkout/orders — the signed-in customer's own orders. */
router.get('/orders', requireAuth, asyncHandler(async (req, res) => {
  res.json(await Order.find({ user: req.user.sub }).sort({ createdAt: -1 }));
}));

/* GET /api/checkout/orders/:id — one order, only for its owner (or an admin). */
router.get('/orders/:id', requireAuth, asyncHandler(async (req, res) => {
  const order = await Order.findOne({ id: String(req.params.id) });
  if (!order) throw ApiError.notFound('Order not found');
  const isOwner = order.user && String(order.user) === String(req.user.sub);
  const isAdmin = req.user.role === 'admin';
  if (!isOwner && !isAdmin) throw ApiError.notFound('Order not found');
  res.json(order);
}));

export default router;
