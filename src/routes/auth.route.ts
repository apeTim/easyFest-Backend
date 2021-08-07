import { Router, Request, Response } from "express";
import { body } from "express-validator";
import * as AuthContoller from '../contollers/auth.contoller';
import * as AuthValidator from '../validators/auth.validator';

const _route: Router = Router();

_route.post('/signup', AuthValidator.signup, AuthContoller.signup);

_route.post('/signin', AuthValidator.signin, AuthContoller.signin);

_route.delete('/logout', AuthContoller.logout);

_route.get('/user', AuthContoller.user);

export default _route;