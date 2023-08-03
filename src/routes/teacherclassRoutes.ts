import { Router } from 'express';
export const teacherRoutes = Router();
import { TeacherclassController } from '../controller/index';
import { Roles, tryCatchMiddleware } from '../middleware/index';
import { teacherClassSchema } from '../validation/validation';
import { OnlyTeacher } from '../middleware/checkPermission';
const controller = new TeacherclassController();

teacherRoutes.post(
    '/',OnlyTeacher(Roles.TEACHER),
    teacherClassSchema,
    tryCatchMiddleware(controller.create.bind(controller)),
);
teacherRoutes.delete('/:id',OnlyTeacher(Roles.TEACHER), tryCatchMiddleware(controller.removeStudent));
teacherRoutes.put(
    '/:id',OnlyTeacher(Roles.TEACHER),
    teacherClassSchema,
    tryCatchMiddleware(controller.update.bind(controller)),
);
teacherRoutes.get('/', tryCatchMiddleware(controller.get.bind(controller)));
