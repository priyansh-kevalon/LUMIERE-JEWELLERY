import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const toJSONOpts = { transform: (doc, ret) => { delete ret._id; delete ret.__v; return ret; } };

const OrderItemSchema = new Schema({
  id: Number,
  name: String,
  price: Number,
  qty: Number,
  image: String,
  size: Schema.Types.Mixed,
  metal: String,
}, { _id: false });

const AddressSchema = new Schema({
  line1: String,
  city: String,
  state: String,
  pincode: String,
}, { _id: false });

export const Order = model('Order', new Schema({
  id: { type: String, required: true, unique: true },
  customer: { name: String, email: String, phone: String },
  items: [OrderItemSchema],
  subtotal: Number,
  shipping: Number,
  tax: Number,
  total: Number,
  status: { type: String, default: 'pending' },
  payment: { type: String, default: 'pending' },
  paymentMethod: String,
  createdAt: { type: Number, default: () => Date.now() },
  address: AddressSchema,
  tracking: String,
}, { timestamps: false, versionKey: false }).set('toJSON', toJSONOpts));
