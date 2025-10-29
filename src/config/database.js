import mongoose from 'mongoose';
import { config } from './env.js';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};