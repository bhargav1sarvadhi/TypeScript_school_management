import { Router } from 'express';
export const nodemailerRoutes = Router();
import { UserController,StudentsController } from '../controller/index';
import { tryCatchMiddleware } from '../middleware/index';
import { updatePasswordSchema } from '../validation/validation';
const controller = new UserController;
const studentcontroller = new StudentsController;

nodemailerRoutes.get('/password-generate/:emailId/:token',tryCatchMiddleware(controller.userInvite));
nodemailerRoutes.patch('/password-generate/:emailId/:token', updatePasswordSchema, tryCatchMiddleware(controller.updatePassword));
nodemailerRoutes.get('/student/password-generate/:emailId/:token',tryCatchMiddleware(studentcontroller.studentInvite));
nodemailerRoutes.patch('/student/password-generate/:emailId/:token',updatePasswordSchema,tryCatchMiddleware(studentcontroller.studentupdatePassword));