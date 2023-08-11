import { Router } from 'express';
import { userRoutes } from './userRoutes';
import { ENDPOINT } from '../constant/EndPoints';
import { authRoutes } from './authRoutes';
import { classRoutes } from './classRoutes';
import { attendanceRoutes } from './attendanceRoutes';
import { sheduleRoutes } from './scheduleRoutes';
import { reportRoutes } from './reportRoutes';
import passport from 'passport';
import { Roles, checkPermission } from '../middleware/index';
import { teacherRoutes } from './teacherclassRoutes';
import { studentviewRoutes } from './studentviewRoutes';
import AppError from '../utils/genrateError';
import { nodemailerRoutes } from './NodemailerRoutes';
import { studentsRoutes } from './studentRoutes';
import { subjectRoutes } from './subjectRoutes';
import { holidayRoutes } from './holidayRoutes';
import { leaveRoutes } from './leaveRoutes';
import { commonRoutes } from './commonGetRoutes';
import { homeworkRoutes } from './homeworkRoutes';
import { dashboardPRoutes } from './dashboard/principaldashRoutes';

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
        this.router.use(ENDPOINT.NODEMAIL, nodemailerRoutes);
        this.router.use(
            ENDPOINT.USER,
            passport.authenticate('jwt', { session: false }),
            checkPermission([Roles.PRINCIPAL]),
            userRoutes,
        );
        this.router.use(
            ENDPOINT.CLASS,
            passport.authenticate('jwt', { session: false }),
            checkPermission([Roles.PRINCIPAL]),
            classRoutes,
        );
        this.router.use(
            ENDPOINT.ATTENDANCE,
            passport.authenticate('jwt', { session: false }),
            attendanceRoutes,
        );
        this.router.use(
            ENDPOINT.SHEDULE,
            passport.authenticate('jwt', { session: false }),
            sheduleRoutes,
        );
        this.router.use(
            ENDPOINT.REPORT,
            passport.authenticate('jwt', { session: false }),
            reportRoutes,
        );
        this.router.use(
            ENDPOINT.TEACHER,
            passport.authenticate('jwt', { session: false }),
            teacherRoutes,
        );
        this.router.use(
            ENDPOINT.STUDENTVIEW,
            passport.authenticate('jwt', { session: false }),
            checkPermission([Roles.STUDENT]),
            studentviewRoutes,
        );
        this.router.use(
            ENDPOINT.STUDENT,
            passport.authenticate('jwt', { session: false }),
            checkPermission([Roles.TEACHER]),
            studentsRoutes,
        );
        this.router.use(
            ENDPOINT.SUBJECT,
            passport.authenticate('jwt', { session: false }),
            checkPermission([Roles.PRINCIPAL]),
            subjectRoutes,
        );
        this.router.use(
            ENDPOINT.HOLIDAY,
            passport.authenticate('jwt', { session: false }),
            checkPermission([Roles.PRINCIPAL]),
            holidayRoutes,
        );
        this.router.use(
            ENDPOINT.LEAVE,
            passport.authenticate('jwt', { session: false }),
            checkPermission([ Roles.TEACHER, Roles.STUDENT ]),
            leaveRoutes,
        );
        this.router.use(
            ENDPOINT.API,
            passport.authenticate('jwt', { session: false }),
            commonRoutes,
        );
        this.router.use(
            ENDPOINT.HOMEWORK,
            passport.authenticate('jwt', { session: false }),
            checkPermission([Roles.TEACHER]),
            homeworkRoutes,
        );
        this.router.use(
            ENDPOINT.DASHBOARD_PRINCIPAL,
            passport.authenticate('jwt', { session: false }),
            checkPermission([Roles.PRINCIPAL]),
            dashboardPRoutes,
        );
        this.router.all('*',invalidRoute);
    }
    getRoutes(): Router {
        return this.router;
    }
}
