import { Router } from 'express';
export const reportRoutes = Router();
import { ReportController } from '../controller/index';
import { tryCatchMiddleware } from '../middleware/index';
import { reportSchema } from '../validation/validation';
import { OnlyTeacher , Roles } from '../middleware/checkPermission';
const controller = new ReportController();

reportRoutes.post(
    '/',OnlyTeacher(Roles.TEACHER),
    reportSchema,
    tryCatchMiddleware(controller.creatreport),
);
reportRoutes.delete(
    '/:id',OnlyTeacher(Roles.TEACHER),
    tryCatchMiddleware(controller.delete.bind(controller)),
);
reportRoutes.put(
    '/:id',
    reportSchema,OnlyTeacher(Roles.TEACHER),
    tryCatchMiddleware(controller.update.bind(controller)),
);
reportRoutes.get('/', tryCatchMiddleware(controller.get.bind(controller)));
