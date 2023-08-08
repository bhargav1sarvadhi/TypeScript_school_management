/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from '../model/index';
import { BaseController } from './BaseController';
import { checkvalidationShedule } from '../validation/ScheduleValidation';
import { AppError } from '../utils';
const sheduleModel = db.sheduleModel;
const classmodel = db.classModel;

export class SheduleController extends BaseController {
    constructor() {
        super(sheduleModel);
    }
    async createschedule(req, res, next) {
        const { body: { classId, time, date }} = req;
        const classes = await classmodel.findOne({ where: { classTeacher: req.user.id }});
        const dayOfWeek = new Date(date).getDay();
        const teacherStd: number = classes.className as unknown as number;
        const validationResult = checkvalidationShedule(time, dayOfWeek, teacherStd);
        if (!validationResult.isValid) {
            throw new AppError('schedules are not allowed.', 'invalid_request');
        }
        const data = await sheduleModel.create(req.body);
        res.status(201).json({ success: true, StatusCode: 201, data: data, message: 'Data Insert Successfully' });
    }

}