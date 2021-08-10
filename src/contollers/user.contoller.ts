import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { DEBUG } from '../config/config';
import { User } from '../database';
import genError from '../utils/genError';


export const activate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){ return next(genError(`Ошибка подтверждения E-Mail`, errors.array(), 400)); }

        let user = await User.findById(req.query.uid);
        if(!user || user.activated){ 
            DEBUG && console.log(`Redirect to /. Reason: No user or user.activated`);
            return res.redirect('/'); 
        }

        user.activated = true;
        await user.save();
        
        req.session.user = {
            id: user.id,
            activate: user.activated
        }
        DEBUG && console.log(`Redirect to /. Reason: end activation`);
        return res.redirect('/');
    } catch(e){
        return next(genError(e.message, [{...e}], 500));
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { first_name, last_name, birthday, sex } = req.body;
        let user = await User.findById(req.session.user.id);
        if(!user){ return next(genError(`Пользователь не найден!`, [], 400)); }
        user.first_name = first_name ? String(first_name) : ''; 
        user.last_name  = last_name ? String(last_name) : ''; 
        user.birthday   = birthday ? new Date(birthday).getTime() : 0; 
        user.sex        = sex ? sex : -1; 
        
        user.phone      = req.body.phone;
        user.vkontakte  = req.body.vkontakte;
        user.facebook   = req.body.facebook;
        user.intagram   = req.body.intagram;

        await user.save();

        return res.json({ 
            message: 'Данные пользователя - обновленны!',
            info: 'Получить обновленные данные GET /auth/user'
        });
    } catch(e){
        return next(genError(e.message, [{...e}], 500));
    }
}

export const change = {
    password: async (req: Request, res: Response, next: NextFunction) => {
        try {
            let { new_password, new_password_confirm, old_password } = req.body;
            let user = await User.findById(req.session.user.id);
            if(!user){ return next(genError('Пользователь не найден!', [], 404)); }

            if(!user.isValidPass(old_password)){ return next(genError('Неверный пароль', [], 400)); }
            if(new_password != new_password_confirm){ return next(genError('Пароли не совпадают', [], 400)); }
            
            user.password = new_password;
            await user.save();
            
            return res.json({
                message: 'Пароль изменён!',
                info: "ЧТобы получить обновлённого пользователя - GET /auth/user"
            });
        } catch(e){
            return next(genError(e.message, [{...e}], 500)); 
        }
    },
    email: (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch(e){
            return next(genError(e.message, [{...e}], 500)); 
        }
    }
}