import { Router } from 'express';
export const dashboardPRoutes = Router();
import { DashboardController } from '../../controller/index';
import { Roles, checkPermission, tryCatchMiddleware } from '../../middleware/index';
const controller = new DashboardController();

dashboardPRoutes.get('/principal',checkPermission(Roles.PRINCIPAL),tryCatchMiddleware(controller.PrincipalDashboard));
dashboardPRoutes.post('/principal/attendace',checkPermission(Roles.PRINCIPAL),tryCatchMiddleware(controller.PrincipalAttendance));
dashboardPRoutes.get('/teacher',checkPermission(Roles.TEACHER),tryCatchMiddleware(controller.TeacherDashboard));
dashboardPRoutes.get('/student',checkPermission(Roles.STUDENT),tryCatchMiddleware(controller.studentDashboard));
