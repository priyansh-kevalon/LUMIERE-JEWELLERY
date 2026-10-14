import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const toJSONOpts = { transform: (doc, ret) => { delete ret._id; delete ret.__v; return ret; } };

export const Category = model('Category', new Schema({
  key: { type: String, required: true, unique: true },
  label: String,
  image: String,
  alt: String,
}, { timestamps: false, versionKey: false }).set('toJSON', toJSONOpts));
