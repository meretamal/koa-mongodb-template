/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv';

dotenv.config();

export const environment = {
  port: Number(process.env.PORT || 3000),
  app: {
    name: process.env.APP_NAME || 'Koa MongoDB Starter',
  },
  database: {
    url: process.env.DATABASE_URL!,
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiration: process.env.JWT_EXPIRATION,
  },
};
