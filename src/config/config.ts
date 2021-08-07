import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    encoding: 'utf-8',
    path: path.join(__dirname, '.env'),
});

export const PORT: number           = Number(process.env.PORT)      || 5000;
export const DB_URL: string         = process.env.DB_URL            || 'mongodb://localhost:27017/easy_test';
export const DEBUG: boolean         = Boolean(process.env.DEBUG)    || true;
export const SESSION_SECRET: string = process.env.SESSION_SECRET    || 'secret_Word';
export const REDIS_HOST: string     = process.env.REDIS_HOST        || 'localhost';
export const REDIS_PORT: number     = Number(process.env.REDIS_PORT)    || 1000;
export const REDIS_PASSWORD: string = process.env.REDIS_PASSWORD        || 'pass';
export const MAILER_HOST: string    = process.env.MAILER_HOST           || 'my.smtp.com';
export const MAILER_PORT: number    = Number(process.env.MAILER_PORT)   || 1000;
export const MAILER_USER: string    = process.env.MAILER_USER           || 'user';
export const MAILER_PASS: string    = process.env.MAILER_PASS           || 'pass';
export const MAILER_ADDRESS: string = process.env.MAILER_ADDRESS        || 'support@my.com';
export const MAILER_NAME: string    = process.env.MAILER_NAME           || 'Localhost Support';
export const DOMAIN: string         = process.env.DOMAIN                || 'https://localhost:3000';