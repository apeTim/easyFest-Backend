import { check } from 'express-validator';

export const signin = [
    check('email', 'E-Mail должен быть заполнен').isEmail(),
    check('password', 'Пароль должен состоять из 8 и более символов!')
];

export const signup = [
    check('email', 'E-Mail должен быть заполнен').isEmail(),
    check('password', 'Пароль должен состоять из 8 и более символов!').notEmpty().isLength({ min: 8 })
];

