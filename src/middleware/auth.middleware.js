import { config } from '../config/env.js';

export const authenticate = async (email, password) => {
  if (email === config.adminEmail && password === config.adminPassword) {
    return { email, role: 'admin' };
  }
  return null;
};