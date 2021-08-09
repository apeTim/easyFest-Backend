import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { DEBUG, DOMAIN } from '../config/config';
import { User } from '../database';
import genError from '../utils/genError';
import mailer from '../utils/mailer';

// Авторизация
export const signin = async function (req: Request, res: Response, next: NextFunction) {
    try {
        // Парсим ошибки
        const errors = validationResult(req);
        // Если ошибки есть
        if (!errors.isEmpty()) { return next(genError(`Недостаточно данных`, errors.array(), 400)); }

        const { email, password } = req.body;
        
        // Проверяем есть ли пользователь с таким E-Mail и если нет - генерируем ошибку
        let user = await User.findOne({ email });
        if (!user) {
            return next(genError(`Пользователь не найден`, [{
                location: 'body',
                param: 'email',
                value: email,
                msg: 'Не найден'
            }], 404));
        }

        if(!user.isValidPass(password)){
            return next(genError(`Неверный пароль`, [{
                location: 'body',
                param: 'password',
                value: password,
                msg: 'Неверный'
            }], 400));
        }

        // Заносим данные пользователя в сессии
        req.session.user = {
            id: user.id
        }

        return res.json({
            message: 'Успешная авторизация',
            info: 'Чтобы получить информацию пользователя отправьте запрос на /auth/user'
        });
    } catch (e) {
        return next(genError(e.message, [{ ...e }]));
    }
};

// Регистрация
export const signup = async function (req: Request, res: Response, next: NextFunction) {
    try {
        DEBUG && console.log('Auth/Signup:' + JSON.stringify(req.body));

        // Парсим ошибки
        const errors = validationResult(req);
        // Если ошибки есть
        if (!errors.isEmpty()) { return next(genError(`Недостаточно данных`, errors.array(), 400)); }

        DEBUG && console.log('Auth/Signup:' + JSON.stringify(req.body));

        // Деструктуризируем body из req
        const { email, password } = req.body;

        // Проверяем есть ли пользователь с таким E-Mail и если есть генерируем ошибку
        let check = await User.findOne({ email });
        if (check) {
            return next(genError(`Пользователь уже зарегистрирован`, [{
                location: 'body',
                param: 'email',
                value: email,
                msg: 'Уже существует'
            }], 400));
        }

        // Создаём пользователя и заносим данные в сессию
        let user = await User.create({ email, password });
        req.session.user = {
            id: user.id
        }

        // Отослать письмо на E-Mail для завершения регистрации
        await mailer.sendActivateMessage(email, `${DOMAIN}/activate?uid=${user.id}`).then(_ => {
            DEBUG && console.log(`Mail with activate code - successful sent.`);
        }).catch(e => { console.error(`Can't send activate-mail! Reason: ${e.message}`); });

        return res.json({
            message: "Пользователь успешно зарегистрован",
            info: 'Чтобы получить информацию пользователя отправьте запрос на /auth/user'
        });
    } catch (e) {
        return next(genError(e.message, [{ ...e }]));
    }
};

// Выход
export const logout = async function (req: Request, res: Response, next: NextFunction) {
    try {
        return req.session.destroy(e => e ? next(genError(`Ошибка сервера`, [{ ...e }], 500)) : res.json({ message: "Вы успешно разлогинены!" }));
    } catch (e) {
        return next(genError(e.message, [{ ...e }]));
    }
};

// Получить данные пользователя
export const user = async function (req: Request, res: Response, next: NextFunction) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) { return next(genError(`Недостаточно данных`, errors.array(), 400)); }
        
        let user = await User.findById(req.session.user.id);
        if(!user){ return next(genError(`Пользователя с таким ID не существует`, [], 400)); }
        
        let object = { ...user.toJSON() };

        // @ts-expect-error
        delete object.password;
        delete object.__v;

        return res.json({
            message: "Данные пользователя",
            user: object
        });
    } catch (e) {
        console.error(`Can't get user. Reason: ${e.message}\n${e.stack}`);
        return next(genError(e.message, [{ ...e }]));
    }
};