import { Router } from 'express';
export const studentviewRoutes = Router();
import { StudentController } from '../controller/index';
import { tryCatchMiddleware } from '../middleware/index';
const controller = new StudentController();

studentviewRoutes.get('/shedule/:date?', tryCatchMiddleware(controller.shedule));
