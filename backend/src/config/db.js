import mongoose from 'mongoose';
import { MONGODB_URI, describeMongoUri } from './env.js';

export async function connectDB() {
  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
  } catch (err) {
    console.error('\n✗ MongoDB connection failed.');
    console.error(`  Target: ${describeMongoUri(MONGODB_URI)}`);
    console.error(`  Reason: ${err.message}`);
    console.error('  Check MONGODB_URI in backend/.env — for Atlas, whitelist your IP and URL-encode special characters in the password.\n');
    throw err;
  }

  console.log(`✓ MongoDB connected — ${describeMongoUri(MONGODB_URI)}`);
  return mongoose.connection;
}
