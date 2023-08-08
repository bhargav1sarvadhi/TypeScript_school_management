import { Router } from 'express';
export const sheduleRoutes = Router();
import { SheduleController } from '../controller/index';
import { tryCatchMiddleware } from '../middleware/index';
import { sheduleSchema } from '../validation/validation';
import { checkPermission, Roles } from '../middleware/checkPermission';
const controller = new SheduleController();

sheduleRoutes.post(
    '/',checkPermission(Roles.TEACHER),
    sheduleSchema,
    tryCatchMiddleware(controller.createschedule),
);
sheduleRoutes.delete(
    '/:id',checkPermission(Roles.TEACHER),
    tryCatchMiddleware(controller.delete.bind(controller)),
);
sheduleRoutes.put(
    '/:id',checkPermission(Roles.TEACHER),
    sheduleSchema,
    tryCatchMiddleware(controller.update.bind(controller)),
);
sheduleRoutes.get('/', tryCatchMiddleware(controller.get.bind(controller)));
