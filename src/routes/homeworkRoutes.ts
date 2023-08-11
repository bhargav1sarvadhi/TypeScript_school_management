import { Router } from 'express';
export const homeworkRoutes = Router();
import { HomeworkController } from '../controller/index';
import { tryCatchMiddleware } from '../middleware/index';
import { holidaySchema } from '../validation/validation';
const controller = new HomeworkController();

homeworkRoutes.post('/',holidaySchema,tryCatchMiddleware(controller.create.bind(controller)));
homeworkRoutes.delete('/:id',tryCatchMiddleware(controller.delete.bind(controller)));
homeworkRoutes.put('/:id',holidaySchema,tryCatchMiddleware(controller.update.bind(controller)));