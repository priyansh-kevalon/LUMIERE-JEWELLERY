import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const toJSONOpts = { transform: (doc, ret) => { delete ret._id; delete ret.__v; return ret; } };

export const Coupon = model('Coupon', new Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true },
  type: { type: String, enum: ['percent', 'fixed'], default: 'percent' },
  value: Number,
  minOrder: Number,
  usageLimit: Number,
  used: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  firstOrderOnly: { type: Boolean, default: false },
  description: String,
}, { timestamps: false, versionKey: false }).set('toJSON', toJSONOpts));
