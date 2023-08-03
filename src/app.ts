/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { Routes } from './routes';
import dotenv from 'dotenv';
import './config/db';
import { logger } from './logger/Logger';
import { errorhandler } from './middleware/errorHandler';
import passport from 'passport';
import './config/passwordJwt';

dotenv.config();
const routes = new Routes();
const port = process.env.PORT_SERVER || 4000;

class App {
    app: express.Application;
    static instance: any;
    constructor() {
        this.app = express();
        this.app.use(express.urlencoded());
        this.app.use(express.json());
        this.app.use(passport.initialize());
        this.app.use('/', routes.getRoutes());
        this.app.listen(port, () => {
            logger.info('server started on port ' + port);
        });
        this.app.use(errorhandler);
    }
}
new App();