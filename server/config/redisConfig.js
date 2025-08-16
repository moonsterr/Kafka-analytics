import dotenv from 'dotenv';
dotenv.config();
export const redisConfig = {
  username: 'default',
  password: process.env.REDIS_PASS,
  socket: {
    host: process.env.REDIS_URI,
    port: 10215,
  },
};
