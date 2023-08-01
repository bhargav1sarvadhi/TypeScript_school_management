import { Router } from 'express';
export const sheduleRoutes = Router();
import { SheduleController } from '../controller/index';
import { tryCatchMiddleware } from '../middleware/index';
import { sheduleSchema } from '../validation/validation';
const controller = new SheduleController();

sheduleRoutes.post(
    '/',
    sheduleSchema,
    tryCatchMiddleware(controller.create.bind(controller)),
);
sheduleRoutes.delete(
    '/:id',
    tryCatchMiddleware(controller.delete.bind(controller)),
);
sheduleRoutes.put(
    '/:id',
    sheduleSchema,
    tryCatchMiddleware(controller.update.bind(controller)),
);
sheduleRoutes.get('/', tryCatchMiddleware(controller.get.bind(controller)));
