import express from 'express';
import { Routes } from './routes';
import dotenv from 'dotenv';
import './config/db';
import { logger } from './logger/Logger';
import { errorhandler } from './middleware/errorHandler';
import passport from 'passport';
import './config/passwordJwt';
import session from 'express-session';
import cors from 'cors';
import path from 'path';
dotenv.config();
const routes = new Routes();
const port = process.env.PORT_SERVER || 4000;

class App {
    app: express.Application;
    static instance: any;
    constructor() {
        this.app = express();
        this.app.use(express.urlencoded());
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(passport.initialize());
        this.app.use(session({
            secret: process.env.SESSION_SECERET,
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 3600000
            }
        }));
        this.app.use('/', routes.getRoutes());
        this.app.listen(port, () => {
            logger.info('server started on port ' + port);
        });
        this.app.use(errorhandler);
    }
}
new App();