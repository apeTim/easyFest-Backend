import { check, query } from 'express-validator';

export const activate = [
    query('uid', 'Укажите параметры')
];