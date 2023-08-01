import { Router } from 'express';
export const teacherRoutes = Router();
import { TeacherclassController } from '../controller/index';
import { tryCatchMiddleware } from '../middleware/index';
import { teacherClassSchema } from '../validation/validation';
const controller = new TeacherclassController();

teacherRoutes.post(
    '/',
    teacherClassSchema,
    tryCatchMiddleware(controller.create.bind(controller)),
);
teacherRoutes.delete('/:id', tryCatchMiddleware(controller.removeStudent));
teacherRoutes.put(
    '/:id',
    teacherClassSchema,
    tryCatchMiddleware(controller.update.bind(controller)),
);
teacherRoutes.get('/', tryCatchMiddleware(controller.get.bind(controller)));
