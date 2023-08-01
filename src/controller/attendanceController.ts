/* eslint-disable @typescript-eslint/no-unused-vars */
import { classModel } from '../model/classModel';
import { db } from '../model/index';
import AppError from '../utils/genrateError';
import { BaseController } from './BaseController';
const attendanceModel = db.attendanceModel;
const teacherclass = db.teacherClasstModel;

export class AttendanceController extends BaseController {
    constructor() {
        super(attendanceModel);
    }

    async createAttendance(req, res, next) {
        const { body: { studentId, date, status }} = req;
        const data = await teacherclass.findOne({ include: [classModel], where: { studentId }});
        const classTeacher: number = data.class.classTeacher;
        if (classTeacher == req.user.id) {
            const attendance = await attendanceModel.create(req.body);
            return res.status(201).json({ success: true, StatusCode: 201, data: attendance, message: 'Data Insert Successfully' });
        } else {
            return next(new AppError('You have not access to other class student attendance', 'forbidden'));
        }
    }
}