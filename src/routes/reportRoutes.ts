import { Router } from 'express';
export const reportRoutes = Router();
import { ReportController } from '../controller/index';
import { checkPermission, tryCatchMiddleware } from '../middleware/index';
import { reportSchema } from '../validation/validation';
import { Roles } from '../middleware/checkPermission';
const controller = new ReportController();

reportRoutes.post(
    '/',checkPermission(Roles.TEACHER),
    reportSchema,
    tryCatchMiddleware(controller.creatreport),
);
reportRoutes.delete(
    '/:id',checkPermission(Roles.TEACHER),
    tryCatchMiddleware(controller.delete.bind(controller)),
);
reportRoutes.put(
    '/:id',
    reportSchema,checkPermission(Roles.TEACHER),
    tryCatchMiddleware(controller.update.bind(controller)),
);
reportRoutes.get('/', checkPermission([ Roles.TEACHER,Roles.PRINCIPAL ]),tryCatchMiddleware(controller.get.bind(controller)));
