
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
        if (!Array.isArray(req.body)) {
            return next(new AppError('Request body should be an array', 'invalid_request'));
        }
        const insertData = req.body.filter(async ({ studentId }) => {
            const data = await teacherclass.findOne({ where: { studentId }});
            return data && data.class && data.class.classTeacher === req.user.id;
        });
        if (insertData.length === 0) {
            return next(new AppError('None of the students are associated with your class', 'forbidden'));
        }
        const bulkinsert = await attendanceModel.bulkCreate(insertData);
        return res.status(201).json({ success: true, StatusCode: 201, data: bulkinsert, message: 'Data Insert Successfully' });
    }

    async Attendanceupdate(req, res, next) {
        const { id } = req.params;
        const [{ studentId, date, status }] = req.body;
        const [updated] = await this.model.update({ studentId, date, status }, { where: { id }});
        if (updated) {
            const updatedData = await this.model.findByPk(id);
            res.status(200).json({ success: true, StatusCode: 200, data: updatedData, message: 'Data Update Successfully' });
        } else {
            return next(new AppError(`This id = ${id} not found`, 'not_found'));
        }
    }
}