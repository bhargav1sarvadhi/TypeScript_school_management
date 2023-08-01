import { Router } from 'express';
export const attendanceRoutes = Router();
import { AttendanceController } from '../controller/index';
import { tryCatchMiddleware } from '../middleware/index';
import { attendanceSchema } from '../validation/validation';
const controller = new AttendanceController();

attendanceRoutes.post(
    '/',
    attendanceSchema,
    tryCatchMiddleware(controller.createAttendance),
);
attendanceRoutes.delete(
    '/:id',
    tryCatchMiddleware(controller.delete.bind(controller)),
);
attendanceRoutes.put(
    '/:id',
    attendanceSchema,
    tryCatchMiddleware(controller.update.bind(controller)),
);
attendanceRoutes.get('/', tryCatchMiddleware(controller.get.bind(controller)));
