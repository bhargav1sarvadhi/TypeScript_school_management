import { Router } from 'express';
import { userRoutes } from './userRoutes';
import { ENDPOINT } from '../constant/EndPoints';
import { authRoutes } from './authRoutes';
import { classRoutes } from './classRoutes';
import { attendanceRoutes } from './attendanceRoutes';
import { sheduleRoutes } from './sheduleRoutes';
import { reportRoutes } from './reportRoutes';
import passport from 'passport';
import { Roles, checkPermission ,Onlystudent } from '../middleware/index';
import { teacherRoutes } from './teacherclassRoutes';
import { studentRoutes } from './studentviewRoutes';
import AppError from '../utils/genrateError';
const invalidRoute = (req, res, next) => {
    return next(new AppError(`${req.url} - url not Found`, 'not_found'));
};

export class Routes {
    router: Router;
    constructor() {
        this.router = Router();
        this.allRoutes();
    }
    allRoutes() {
        this.router.use(ENDPOINT.AUTH, authRoutes);
        this.router.use(
            ENDPOINT.USER,
            passport.authenticate('jwt', { session: false }),
            checkPermission(Roles.PRINCIPAL),
            userRoutes,
        );
        this.router.use(
            ENDPOINT.CLASS,
            passport.authenticate('jwt', { session: false }),
            checkPermission(Roles.PRINCIPAL),
            classRoutes,
        );
        this.router.use(
            ENDPOINT.ATTENDANCE,
            passport.authenticate('jwt', { session: false }),
            checkPermission(Roles.TEACHER),
            attendanceRoutes,
        );
        this.router.use(
            ENDPOINT.SHEDULE,
            passport.authenticate('jwt', { session: false }),
            checkPermission(Roles.TEACHER),
            sheduleRoutes,
        );
        this.router.use(
            ENDPOINT.REPORT,
            passport.authenticate('jwt', { session: false }),
            checkPermission(Roles.TEACHER),
            reportRoutes,
        );
        this.router.use(
            ENDPOINT.TEACHER,
            passport.authenticate('jwt', { session: false }),
            checkPermission(Roles.TEACHER),
            teacherRoutes,
        );
        this.router.use(
            ENDPOINT.STUDENT,
            passport.authenticate('jwt', { session: false }),
            Onlystudent(Roles.STUDENT),
            studentRoutes,
        );
        this.router.all('*',invalidRoute);
    }
    getRoutes(): Router {
        return this.router;
    }
}
