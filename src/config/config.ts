import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    encoding: 'utf-8',
    path: path.join(__dirname, '.env'),
});

export const PORT               = process.env.PORT              || 5000;
export const DB_URL             = process.env.DB_URL            || 'mongodb://localhost:27017/easy_test';
export const DEBUG              = process.env.DEBUG             || true;
export const SESSION_SECRET     = process.env.SESSION_SECRET    || 'secret_Word';
export const REDIS_HOST         = process.env.REDIS_HOST        || 'localhost';
export const REDIS_PORT         = process.env.REDIS_PORT        || 1000;
export const REDIS_PASSWORD     = process.env.REDIS_PASSWORD    || 'pass';