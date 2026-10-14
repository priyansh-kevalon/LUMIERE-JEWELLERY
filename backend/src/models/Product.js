import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const toJSONOpts = { transform: (doc, ret) => { delete ret._id; delete ret.__v; return ret; } };

const FinishSchema = new Schema({ name: String, color: String }, { _id: false });

export const Product = model('Product', new Schema({
  id: { type: Number, required: true, unique: true, index: true },
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, index: true },
  categoryLabel: String,
  type: String,
  metal: String,
  material: String,
  weight: String,
  diamondShape: String,
  diamondType: String,
  diamondCarat: String,
  occasion: String,
  style: String,
  availability: String,
  price: { type: Number, required: true, min: 0 },
  compareAt: Number,
  badge: String,
  popularity: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviews: Number,
  variants: [String],
  image: String,
  alt: String,
  description: String,
  details: String,
  about: String,
  sizes: [String],
  finishes: [FinishSchema],
  stock: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false }).set('toJSON', toJSONOpts));
