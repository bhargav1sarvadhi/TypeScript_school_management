import { Router } from 'express';
export const sheduleRoutes = Router();
import { SheduleController } from '../controller/index';
import { tryCatchMiddleware } from '../middleware/index';
import { sheduleSchema } from '../validation/validation';
import { OnlyTeacher, Roles } from '../middleware/checkPermission';
const controller = new SheduleController();

sheduleRoutes.post(
    '/',OnlyTeacher(Roles.TEACHER),
    sheduleSchema,
    tryCatchMiddleware(controller.create.bind(controller)),
);
sheduleRoutes.delete(
    '/:id',OnlyTeacher(Roles.TEACHER),
    tryCatchMiddleware(controller.delete.bind(controller)),
);
sheduleRoutes.put(
    '/:id',OnlyTeacher(Roles.TEACHER),
    sheduleSchema,
    tryCatchMiddleware(controller.update.bind(controller)),
);
sheduleRoutes.get('/', tryCatchMiddleware(controller.get.bind(controller)));
