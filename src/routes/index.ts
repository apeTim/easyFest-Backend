import { Router } from 'express';
import AuthRouter from './auth.route';
import UserRouter from './user.route';

import * as UserContoller from '../contollers/user.contoller';
import * as UserValidator from '../validators/user.validator';
import { isLogged } from '../middlewares/access.middleware';

const _route: Router = Router(); 

_route.use('/user', isLogged, UserRouter);
_route.use('/auth', AuthRouter);

_route.get('/activate', isLogged, UserValidator.activate, UserContoller.activate);

export default _route;