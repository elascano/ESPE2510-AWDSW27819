import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  plosApiUrl: process.env.PLOS_API_URL || 'https://api.plos.org/search',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173'
};
