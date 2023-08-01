import { Router } from 'express';
export const reportRoutes = Router();
import { ReportController } from '../controller/index';
import { tryCatchMiddleware } from '../middleware/index';
import { reportSchema } from '../validation/validation';
const controller = new ReportController();

reportRoutes.post(
    '/',
    reportSchema,
    tryCatchMiddleware(controller.creatreport),
);
reportRoutes.delete(
    '/:id',
    tryCatchMiddleware(controller.delete.bind(controller)),
);
reportRoutes.put(
    '/:id',
    reportSchema,
    tryCatchMiddleware(controller.update.bind(controller)),
);
reportRoutes.get('/', tryCatchMiddleware(controller.get.bind(controller)));
