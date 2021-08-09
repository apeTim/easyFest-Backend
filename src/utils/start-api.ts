import { Express, NextFunction, Request, Response } from "express";
import { Server as HTTPServer } from 'http';
import { DEBUG, PORT, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, SESSION_SECRET } from '../config/config';
import { User } from "../database";
import cookieParser from 'cookie-parser';
import sessions, { SessionOptions, MemoryStore } from 'express-session';
import bodyParser from 'body-parser';
import redis from 'redis';
import helmet from 'helmet';
import RedisStore from 'connect-redis';
import Routes from '../routes';

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
redisClient.on('error', (e) => console.error(`Can't connect to redis-store: ${e}`));

const STORE = RedisStore(sessions);

const SESSION_OPTIONS: SessionOptions = {  
    store: DEBUG ? new MemoryStore() : new STORE({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    rolling: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

export default async ({ app, srv }: Options) => {
    try {
        // if DEBUG - on, then clear all database
        if(DEBUG){
            // await User.deleteMany();   
        }

        app.use(helmet());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json({ strict: true }));
        app.use(cookieParser());
        app.use(sessions(SESSION_OPTIONS));
        app.use(Routes);
        app.use((error: any, req: Request, res: Response, next: NextFunction) => {
            return res.status(error.code).json(error);
        });
        app.use((req, res) => {
            return res.status(404).json({ message: 'Route not found' });
        });

        srv.listen(PORT, () => console.log(`API-Server listeing ${PORT} port.`));
    } catch (e) {
        console.error(`Server-Start:Error -> ${e.message}\n${e.stack}`);
        process.exit(-1);
    }
};