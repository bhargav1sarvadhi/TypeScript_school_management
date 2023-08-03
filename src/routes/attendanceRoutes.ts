import { Router } from 'express';
export const attendanceRoutes = Router();
import { AttendanceController } from '../controller/index';
import { tryCatchMiddleware } from '../middleware/index';
import { attendanceSchema } from '../validation/validation';
import { OnlyTeacher , Roles } from '../middleware/checkPermission';

const controller = new AttendanceController();

attendanceRoutes.post(
    '/',OnlyTeacher(Roles.TEACHER),
    attendanceSchema,
    tryCatchMiddleware(controller.createAttendance),
);
attendanceRoutes.delete(
    '/:id',OnlyTeacher(Roles.TEACHER),
    tryCatchMiddleware(controller.delete.bind(controller)),
);
attendanceRoutes.put(
    '/:id',OnlyTeacher(Roles.TEACHER),
    attendanceSchema,
    tryCatchMiddleware(controller.update.bind(controller)),
);
attendanceRoutes.get('/', tryCatchMiddleware(controller.get.bind(controller)));
