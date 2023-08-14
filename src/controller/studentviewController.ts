/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { classModel } from '../model/classModel';
import { db } from '../model/index';
import { sheduleModel } from '../model/scheduleModel';
import { StudentModel } from '../model/studentModel';
import { UserModel } from '../model/userModel';
import AppError from '../utils/genrateError';
const teacherclass = db.teacherClasstModel;

export class StudentController {
    async shedule(req, res, next) {
        const { params: { date } } = req;
        const today = new Date();
        const Tdate = today.toISOString().split('T')[0];
        const studentId = req.user.id;
        const IncludeOption = [{
            model: classModel,
            attributes: [ 'className', 'grade' ],
            include: [{
                model: sheduleModel,
                attributes: [ 'date', 'time' ],
                where: { date: date || Tdate }
            }]
        }];
        const schedule = await teacherclass.findAll({ include: IncludeOption, where: { studentId: studentId } });
        const profile = await StudentModel.findAll({where: {id: req.user.id}});
        return res.status(200).json({ success: true, StatusCode: 200, data: {profile,schedule}, message: 'Data Finded Successfully' });
    }
}