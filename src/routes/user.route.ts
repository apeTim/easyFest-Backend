import { Router, Request, Response } from "express";
import * as UserContoller from '../contollers/user.contoller';
import * as UserValidator from '../validators/user.validator';
import { isLogged } from '../middlewares/access.middleware';


const _route: Router = Router();

_route.post('/update', UserValidator.update, UserContoller.update);

export default _route;