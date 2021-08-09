import { Request, Response, NextFunction } from "express"
import genError from "../utils/genError"

export const isLogged = (req: Request, res: Response, next: NextFunction) => {
    if(!req.session.user){
        return next(genError('Не авторизирован', [], 403));
    }
    return next();
}

export const notLogged = (req: Request, res: Response, next: NextFunction) => {
    if(req.session.user){ return res.json({ message: "Уже авторизирован!" }); }
    return next();
}

export const hasRights = (role: string) => (req: Request, res: Response, next: NextFunction) => {}