import { check, body } from 'express-validator';

export const signin = [
    body('email', 'E-Mail должен быть заполнен').isEmail(),
    body('password', 'Пароль должен состоять из 8 и более символов!').isLength({ min: 8 })
];

export const signup = [
    body('email', 'E-Mail должен быть заполнен').notEmpty().isEmail(),
    body('password', 'Пароль должен состоять из 8 и более символов!').isLength({ min: 8 })
];

