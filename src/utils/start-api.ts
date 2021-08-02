import { Express } from "express";
import { Server as HTTPServer } from 'http';
import { DEBUG, PORT } from '../config/config';
import { User } from "../database";

interface Options {
    app: Express,
    srv: HTTPServer
}

export default async ({ app, srv }: Options) => {
    try {
        if(DEBUG){
            await User.deleteMany();   
        }

        srv.listen(PORT, () => console.log(`API-Server listeing ${PORT} port.`));
    } catch (e) {
        console.error(`Server-Start:Error -> ${e.message}\n${e.stack}`);
    }
};