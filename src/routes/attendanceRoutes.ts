import { Router } from 'express';
export const attendanceRoutes = Router();
import { AttendanceController } from '../controller/index';
import { Roles, checkPermission, tryCatchMiddleware } from '../middleware/index';
import { attendanceSchema } from '../validation/validation';

const controller = new AttendanceController();

attendanceRoutes.post(
    '/',
    attendanceSchema,checkPermission([Roles.TEACHER]),
    tryCatchMiddleware(controller.createAttendance),
);
attendanceRoutes.delete(
    '/:id',checkPermission([Roles.TEACHER]),
    tryCatchMiddleware(controller.delete.bind(controller)),
);
attendanceRoutes.put(
    '/:id',attendanceSchema,checkPermission([Roles.TEACHER]),
    tryCatchMiddleware(controller.Attendanceupdate),
);
attendanceRoutes.get('/:studentId',checkPermission([ Roles.PRINCIPAL,Roles.TEACHER ]), tryCatchMiddleware(controller.getAttendance));
