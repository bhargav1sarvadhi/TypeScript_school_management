import { Router } from 'express';
export const studentRoutes = Router();
import { StudentController } from '../controller/index';
import { tryCatchMiddleware } from '../middleware/index';
const controller = new StudentController();

studentRoutes.get('/shedule/:date?', tryCatchMiddleware(controller.shedule));
