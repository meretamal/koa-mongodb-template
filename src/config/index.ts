/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  app: {
    name: process.env.APP_NAME || 'Koa MongoDB Starter',
    port: Number(process.env.PORT || 3000),
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
};
