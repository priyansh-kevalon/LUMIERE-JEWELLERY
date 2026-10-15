import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const toJSONOpts = { transform: (doc, ret) => { delete ret._id; delete ret.__v; return ret; } };

export const User = model('User', new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, default: '' },
  password: { type: String, required: true },
  resetCode: { type: String },
  resetCodeExpires: { type: Number },
  createdAt: { type: Number, default: () => Date.now() },
}, { timestamps: false, versionKey: false }).set('toJSON', toJSONOpts));

export const Admin = model('Admin', new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  name: { type: String, required: true },
  role: { type: String, default: 'Owner' },
  password: { type: String, required: true },
  createdAt: { type: Number, default: () => Date.now() },
}, { timestamps: false, versionKey: false }).set('toJSON', toJSONOpts));
