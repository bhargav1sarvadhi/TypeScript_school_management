import { Router } from 'express';
export const userRoutes = Router();
import { UserController } from '../controller/index';
import { tryCatchMiddleware } from '../middleware/index';
import { createAccountSchema } from '../validation/validation';
const controller = new UserController();

userRoutes.delete(
    '/:id',
    tryCatchMiddleware(controller.delete.bind(controller)),
);
userRoutes.put(
    '/:id',
    createAccountSchema,
    tryCatchMiddleware(controller.update.bind(controller)),
);
userRoutes.get('/', tryCatchMiddleware(controller.get.bind(controller)));
