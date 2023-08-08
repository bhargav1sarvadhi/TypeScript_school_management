import { Router } from 'express';
export const teacherRoutes = Router();
import { TeacherclassController } from '../controller/index';
import { Roles, tryCatchMiddleware } from '../middleware/index';
import { teacherClassSchema } from '../validation/validation';
import { checkPermission } from '../middleware/checkPermission';
const controller = new TeacherclassController();

teacherRoutes.post(
    '/',checkPermission(Roles.TEACHER),
    teacherClassSchema,
    tryCatchMiddleware(controller.create.bind(controller)),
);
teacherRoutes.delete('/:id',checkPermission(Roles.TEACHER), tryCatchMiddleware(controller.removeStudent));
teacherRoutes.put(
    '/:id',checkPermission(Roles.TEACHER),
    teacherClassSchema,
    tryCatchMiddleware(controller.update.bind(controller)),
);
teacherRoutes.get('/', checkPermission([ Roles.TEACHER,Roles.PRINCIPAL ]),tryCatchMiddleware(controller.get.bind(controller)));
