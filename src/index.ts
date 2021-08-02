import express, { Express } from 'express';
import { Server as HTTPServer } from 'http';
import { PORT } from './config/config';

const app: Express = express();
const srv: HTTPServer = new HTTPServer(app);

srv.listen(PORT, () => console.log(`API-Server listeing ${PORT} port.`));