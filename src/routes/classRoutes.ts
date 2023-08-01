import { Router } from 'express';
export const classRoutes = Router();
import { ClassController } from '../controller/index';
import passport from 'passport';
import {
    tryCatchMiddleware,
    Roles,
    checkPermission,
} from '../middleware/index';
import { classSchema } from '../validation/validation';
const controller = new ClassController();

classRoutes.post(
    '/',
    classSchema,
    tryCatchMiddleware(controller.create.bind(controller)),
);
classRoutes.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    checkPermission(Roles.PRINCIPAL),
    tryCatchMiddleware(controller.delete.bind(controller)),
);
classRoutes.put(
    '/:id',
    classSchema,
    passport.authenticate('jwt', { session: false }),
    checkPermission(Roles.PRINCIPAL),
    tryCatchMiddleware(controller.update.bind(controller)),
);
classRoutes.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    checkPermission(Roles.PRINCIPAL),
    tryCatchMiddleware(controller.get.bind(controller)),
);
