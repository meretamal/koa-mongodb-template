/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv';

dotenv.config();

export const config = {
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
  mailer: {
    smtpHost: process.env.MAILER_SMTP_HOST!,
    smtpPort: Number(process.env.MAILER_SMTP_PORT || 465),
    smtpUsername: process.env.MAILER_SMTP_USERNAME!,
    smtpPassword: process.env.MAILER_SMTP_PASSWORD!,
    sender: process.env.MAILER_SENDER!,
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT || 6379),
    password: process.env.REDIS_PASSWORD!,
    url: process.env.REDIS_URL!,
  },
};
