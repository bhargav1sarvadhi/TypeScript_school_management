import { Router } from 'express';
export const commonRoutes = Router();
import { LeaveController } from '../controller/index';
import { Roles, checkPermission, tryCatchMiddleware } from '../middleware/index';
const controller = new LeaveController();

commonRoutes.get('/showleaves',checkPermission(Roles.PRINCIPAL) , tryCatchMiddleware(controller.PrincipalGetLeave));
commonRoutes.patch('/aproveleave/:id',checkPermission(Roles.PRINCIPAL) , tryCatchMiddleware(controller.AproveLeave));
commonRoutes.patch('/rejectleave/:id',checkPermission(Roles.PRINCIPAL) , tryCatchMiddleware(controller.RejectLeave));
commonRoutes.patch('/teacher/aproveleave/:id',checkPermission(Roles.TEACHER) , tryCatchMiddleware(controller.AproveLeave));
commonRoutes.patch('/teacher/rejectleave/:id', checkPermission(Roles.TEACHER), tryCatchMiddleware(controller.RejectLeave));
commonRoutes.get('/teacher/showleaves',checkPermission(Roles.TEACHER) , tryCatchMiddleware(controller.teacherGetLeave));
