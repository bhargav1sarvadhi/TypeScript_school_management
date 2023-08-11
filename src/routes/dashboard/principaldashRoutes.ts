import { Router } from 'express';
export const dashboardPRoutes = Router();
import { PrincipalDashboardController } from '../../controller/index';
import { tryCatchMiddleware } from '../../middleware/index';
const controller = new PrincipalDashboardController();

dashboardPRoutes.get('/', tryCatchMiddleware(controller.datacountShow));
