import { Router } from 'express';
export const subjectRoutes = Router();
import { SubjectController } from '../controller/index';
import { tryCatchMiddleware } from '../middleware/index';
import { subjectSchema } from '../validation/validation';
const controller = new SubjectController();

subjectRoutes.post('/',subjectSchema,tryCatchMiddleware(controller.create.bind(controller)));
subjectRoutes.delete('/:id',tryCatchMiddleware(controller.delete.bind(controller)));
subjectRoutes.put('/:id',subjectSchema,tryCatchMiddleware(controller.update.bind(controller)));