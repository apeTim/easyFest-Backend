import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import genError from '../utils/genError';

export const signin = async function(req: Request, res: Response, next: NextFunction){
    try {
        const errors = validationResult(req); 
    } catch(e){ 
        return next(genError(e.message, [{...e}]));
    }
};

export const signup = async function(req: Request, res: Response, next: NextFunction){
    try {
        const errors = validationResult(req); 
    } catch(e){ 
        return next(genError(e.message, [{...e}]));
    }
};

export const logout = async function(req: Request, res: Response, next: NextFunction){
    try {
        const errors = validationResult(req); 
    } catch(e){ 
        return next(genError(e.message, [{...e}]));
    }
};

export const user = async function(req: Request, res: Response, next: NextFunction){
    try {
        const errors = validationResult(req); 
    } catch(e){ 
        return next(genError(e.message, [{...e}]));
    }
};