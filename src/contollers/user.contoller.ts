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