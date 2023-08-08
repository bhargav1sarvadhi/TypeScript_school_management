import { Router } from 'express';
export const studentsRoutes = Router();
import { StudentsController } from '../controller/index';
import { tryCatchMiddleware } from '../middleware/index';
import { studentSchema } from '../validation/validation';
const controller = new StudentsController();

studentsRoutes.post('/create',studentSchema,tryCatchMiddleware(controller.studentsingup));
studentsRoutes.delete('/:id',studentSchema,tryCatchMiddleware(controller.delete.bind(controller)));
studentsRoutes.put('/:id',studentSchema,tryCatchMiddleware(controller.update.bind(controller)));
