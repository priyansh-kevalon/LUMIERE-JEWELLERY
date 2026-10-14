import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const toJSONOpts = { transform: (doc, ret) => { delete ret._id; delete ret.__v; return ret; } };

export const Setting = model('Setting', new Schema({
  key: { type: String, default: 'main', unique: true },
  storeName: String,
  currency: String,
  timezone: String,
  contactEmail: String,
  phone: String,
  address: String,
  gstRate: Number,
  freeShippingThreshold: Number,
  lowStockThreshold: Number,
  social: { type: Map, of: String, default: {} },
  paymentMethods: [String],
}, { timestamps: false, versionKey: false }).set('toJSON', toJSONOpts));
