import { Router } from 'express';
import AuthRouter from './auth.route';
import UserRouter from './user.route';

import * as UserContoller from '../contollers/user.contoller';

const _route: Router = Router(); 

_route.use('/user', UserRouter);
_route.use('/auth', AuthRouter);

_route.get('/activate', UserContoller.activate);

export default _route;