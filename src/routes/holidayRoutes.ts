import { Router } from 'express';
export const holidayRoutes = Router();
import { HolidayController } from '../controller/index';
import { tryCatchMiddleware } from '../middleware/index';
import { holidaySchema } from '../validation/validation';
const controller = new HolidayController();

holidayRoutes.post('/',holidaySchema,tryCatchMiddleware(controller.create.bind(controller)));
holidayRoutes.delete('/:id',tryCatchMiddleware(controller.delete.bind(controller)));
holidayRoutes.put('/:id',holidaySchema,tryCatchMiddleware(controller.update.bind(controller)));