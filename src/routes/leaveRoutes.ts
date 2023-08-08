import { Router } from 'express';
export const leaveRoutes = Router();
import { LeaveController } from '../controller/index';
import { tryCatchMiddleware } from '../middleware/index';
import { leaveSchema } from '../validation/validation';
const controller = new LeaveController();

leaveRoutes.post('/',leaveSchema,tryCatchMiddleware(controller.applyLeave));
// leaveRoutes.delete('/:id',studentSchema,tryCatchMiddleware(controller.delete.bind(controller)));
// leaveRoutes.put('/:id',studentSchema,tryCatchMiddleware(controller.update.bind(controller)));