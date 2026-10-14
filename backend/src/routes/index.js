import { Router } from 'express';
import authRoutes from './auth.routes.js';
import adminRoutes from './admin.routes.js';
import settingsRoutes from './settings.routes.js';
import customerRoutes from './customer.routes.js';
import contactRoutes from './contact.routes.js';
import newsletterRoutes from './newsletter.routes.js';
import checkoutRoutes from './checkout.routes.js';
import { crudRouter } from './crudRouter.js';
import { requireAdmin } from '../middleware/auth.js';
import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';
import { Order } from '../models/Order.js';
import { Coupon } from '../models/Coupon.js';
import { Review } from '../models/Review.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), time: Date.now() });
});

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);

/* Public reads, admin writes. */
router.use('/products', crudRouter({ Model: Product, key: 'id', keyType: 'number', sort: 'id' }));
router.use('/categories', crudRouter({ Model: Category, key: 'key', keyType: 'string' }));
router.use('/reviews', crudRouter({ Model: Review, key: 'id', keyType: 'number', sort: '-createdAt' }));

/* Admin-only resources. */
router.use('/orders', crudRouter({
  Model: Order,
  key: 'id',
  keyType: 'string',
  sort: '-createdAt',
  readGuard: requireAdmin,
  assignKey: false,
}));
router.use('/coupons', crudRouter({ Model: Coupon, key: 'code', keyType: 'string', sort: 'code' }));

router.use('/settings', settingsRoutes);
router.use('/customers', customerRoutes);
router.use('/contact', contactRoutes);
router.use('/newsletter', newsletterRoutes);
router.use('/checkout', checkoutRoutes);

export default router;
