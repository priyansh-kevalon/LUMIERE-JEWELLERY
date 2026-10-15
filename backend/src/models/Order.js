import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const toJSONOpts = { transform: (doc, ret) => { delete ret._id; delete ret.__v; return ret; } };

/* Snapshot of a purchased line. Name/price/image are copied in at order time so
   the order stays accurate even if the product is later edited or removed. */
const OrderItemSchema = new Schema({
  id: { type: Number, required: true },
  name: String,
  price: { type: Number, required: true, min: 0 },
  qty: { type: Number, required: true, min: 1 },
  image: String,
  size: String,
  metal: String,
}, { _id: false });

const AddressSchema = new Schema({
  line1: String,   /* house / flat number and street */
  line2: String,   /* area / locality */
  city: String,
  state: String,
  pincode: String,
  country: String,
}, { _id: false });

export const Order = model('Order', new Schema({
  id: { type: String, required: true, unique: true, index: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', default: null, index: true },
  customer: {
    name: String,
    email: String,
    phone: String,
  },
  items: [OrderItemSchema],
  subtotal: { type: Number, default: 0 },
  shipping: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  couponCode: String,
  /* Order lifecycle — kept separate from the payment lifecycle. */
  status: { type: String, default: 'pending' },
  /* Payment lifecycle: pending | paid | failed | refunded */
  payment: { type: String, default: 'pending' },
  paymentMethod: String,
  /* Razorpay references. The secret is never stored here. */
  razorpayOrderId: String,
  razorpayPaymentId: String,
  stockReduced: { type: Boolean, default: false },
  createdAt: { type: Number, default: () => Date.now() },
  updatedAt: { type: Number, default: () => Date.now() },
  address: AddressSchema,
  tracking: String,
}, { timestamps: false, versionKey: false }).set('toJSON', toJSONOpts));
