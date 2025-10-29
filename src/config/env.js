import dotenv from 'dotenv';
dotenv.config();

export const config = {
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT || 4000,
  adminEmail: process.env.ADMIN_EMAIL || 'admin@cvportal.com',
  adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
  cookieSecret: process.env.COOKIE_SECRET || 'change-this-secret',
  sessionSecret: process.env.SESSION_SECRET || 'change-this-session-secret',
  nodeEnv: process.env.NODE_ENV || 'development'
};