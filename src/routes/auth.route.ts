import { Router, Request, Response } from "express";
import * as AuthContoller from '../contollers/auth.contoller';
import { isLogged, notLogged } from "../middlewares/access.middleware";
import * as AuthValidator from '../validators/auth.validator';

const _route: Router = Router();

_route.post('/signup', notLogged, AuthValidator.signup, AuthContoller.signup);

_route.post('/signin', notLogged, AuthValidator.signin, AuthContoller.signin);

_route.delete('/logout', isLogged, AuthContoller.logout);

_route.get('/user', isLogged, AuthContoller.user);

export default _route;