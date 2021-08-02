import express, { Express } from 'express';
import { Server as HTTPServer } from 'http';
import startApi from './utils/start-api';

const app: Express = express();
const srv: HTTPServer = new HTTPServer(app);

startApi({ app, srv });