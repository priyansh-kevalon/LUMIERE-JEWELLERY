import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';
import { Order } from '../models/Order.js';
import { Coupon } from '../models/Coupon.js';
import { Review } from '../models/Review.js';
import { Setting } from '../models/Setting.js';
import { Admin } from '../models/User.js';
import {
  DEFAULT_ADMIN,
  seedCategories,
  seedOrders,
  seedCoupons,
  seedReviews,
  seedSettings,
  withInventory,
} from './data.js';

async function run() {
  await connectDB();

  await Promise.all([
    Product.deleteMany({}),
    Category.deleteMany({}),
    Order.deleteMany({}),
    Coupon.deleteMany({}),
    Review.deleteMany({}),
    Setting.deleteMany({}),
    Admin.deleteMany({}),
  ]);

  const products = withInventory();
  await Category.insertMany(seedCategories);
  await Product.insertMany(products);
  await Order.insertMany(seedOrders);
  await Coupon.insertMany(seedCoupons);
  await Review.insertMany(seedReviews);
  await Setting.create({ key: 'main', ...seedSettings });

  const password = await bcrypt.hash(DEFAULT_ADMIN.password, 10);
  await Admin.create({
    email: DEFAULT_ADMIN.email,
    name: 'Store Administrator',
    role: 'Owner',
    password,
    createdAt: Date.now(),
  });

  console.log(
    `✓ Seeded ${products.length} products · ${seedCategories.length} categories · ${seedOrders.length} orders · ` +
    `${seedCoupons.length} coupons · ${seedReviews.length} reviews · 1 admin`,
  );
  console.log(`  Admin login: ${DEFAULT_ADMIN.email} / ${DEFAULT_ADMIN.password}`);

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error('✗ Seed failed:', err.message);
  process.exit(1);
});
