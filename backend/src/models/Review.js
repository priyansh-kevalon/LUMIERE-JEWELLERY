import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const toJSONOpts = { transform: (doc, ret) => { delete ret._id; delete ret.__v; return ret; } };

export const Review = model('Review', new Schema({
  id: { type: Number, required: true, unique: true },
  productId: Number,
  productName: String,
  author: String,
  rating: Number,
  title: String,
  body: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  reply: { type: String, default: '' },
  createdAt: { type: Number, default: () => Date.now() },
}, { timestamps: false, versionKey: false }).set('toJSON', toJSONOpts));
