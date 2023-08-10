import { Router } from 'express';
export const leaveRoutes = Router();
import { LeaveController } from '../controller/index';
import { Roles, checkPermission, tryCatchMiddleware } from '../middleware/index';
import { leaveSchema } from '../validation/validation';
const controller = new LeaveController();

leaveRoutes.post('/',leaveSchema,tryCatchMiddleware(controller.applyLeave));
leaveRoutes.delete('/:id',tryCatchMiddleware(controller.delete.bind(controller)));
leaveRoutes.put('/:id', leaveSchema, tryCatchMiddleware(controller.update.bind(controller)));
leaveRoutes.get('/teacher',checkPermission(Roles.TEACHER) , tryCatchMiddleware(controller.getTeacher));
leaveRoutes.get('/student',checkPermission(Roles.STUDENT) , tryCatchMiddleware(controller.getStudent));
