import { Router, Request, Response } from "express";
import { body } from "express-validator";
import * as AuthContoller from '../contollers/auth.contoller';

const _route: Router = Router();

_route.post('/signup', AuthContoller.signup);

_route.post('/signin', AuthContoller.signin);

_route.delete('/logout', AuthContoller.logout);

_route.get('/user', AuthContoller.user);

export default _route;