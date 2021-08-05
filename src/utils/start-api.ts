import { Express, NextFunction, Request, Response } from "express";
import { Server as HTTPServer } from 'http';
import { DEBUG, PORT, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, SESSION_SECRET } from '../config/config';
import { User } from "../database";
import cookieParser from 'cookie-parser';
import sessions, { SessionOptions } from 'express-session';
import redis from 'redis';
import RedisStore from 'connect-redis';

interface Options {
    app: Express,
    srv: HTTPServer
}

const redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD
});

redisClient.on('connect', () => console.log(`Successful connect to redis-store!`));

const STORE = RedisStore(sessions);

const SESSION_OPTIONS: SessionOptions = {  
    store: new STORE({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    rolling: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        httpOnly: true,
        sameSite: 'none'
    }
}

export default async ({ app, srv }: Options) => {
    try {
        // if DEBUG - on, then clear all database
        if(DEBUG){
            await User.deleteMany();   
        }

        app.use(cookieParser());
        app.use(sessions(SESSION_OPTIONS));
        app.use((error: any, req: Request, res: Response, next: NextFunction) => {
            return res.status(error.code).json(error);
        });

        srv.listen(PORT, () => console.log(`API-Server listeing ${PORT} port.`));
    } catch (e) {
        console.error(`Server-Start:Error -> ${e.message}\n${e.stack}`);
        process.exit(-1);
    }
};