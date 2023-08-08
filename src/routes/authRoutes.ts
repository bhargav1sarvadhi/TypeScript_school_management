import { Router } from 'express';
export const authRoutes = Router();
import passport from 'passport';
import { AuthContoller, UserController } from '../controller/index';
import tryCatchMiddleware from '../middleware/asyncWrapperFunction';
import { createAccountSchema } from '../validation/validation';
const controller = new UserController();
const authController = new AuthContoller();

authRoutes.post(
    '/signup',
    createAccountSchema,
    tryCatchMiddleware(controller.singup),
);
authRoutes.post(
    '/signup/bulkcreate',
    tryCatchMiddleware(controller.bulkinsert.bind(controller)),
);
authRoutes.post('/login', tryCatchMiddleware(authController.login));
authRoutes.get(
    '/logout',
    passport.authenticate('jwt', { session: false }),
    tryCatchMiddleware(authController.logout),
);
