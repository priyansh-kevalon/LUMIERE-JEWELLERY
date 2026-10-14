import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const toJSONOpts = { transform: (doc, ret) => { delete ret._id; delete ret.__v; return ret; } };

export const ContactMessage = model('ContactMessage', new Schema({
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  createdAt: { type: Number, default: () => Date.now() },
}, { timestamps: false, versionKey: false }).set('toJSON', toJSONOpts));

export const NewsletterSubscriber = model('NewsletterSubscriber', new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  createdAt: { type: Number, default: () => Date.now() },
}, { timestamps: false, versionKey: false }).set('toJSON', toJSONOpts));
