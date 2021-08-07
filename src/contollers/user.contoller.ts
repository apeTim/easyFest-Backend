import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { User } from '../database';
import genError from '../utils/genError';


export const activate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){ return next(genError(`Ошибка подтверждения E-Mail`, errors.array(), 400)); }

        let user = await User.findById(req.query.id);
        if(!user || user.activated){ return res.redirect('/'); }

        user.activated = true;
        await user.save();
        
        req.session.user.activated = true;

        return res.redirect('/');
    } catch(e){
        return next(genError(e.message, [{...e}], 500));
    }
}