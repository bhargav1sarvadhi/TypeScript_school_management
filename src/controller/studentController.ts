/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { classModel } from '../model/classModel';
import { db } from '../model/index';
import { sheduleModel } from '../model/seheduleModel';
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
            model: UserModel,
            attributes: ['userName'],
        }, {
            model: classModel,
            attributes: [ 'className', 'grade' ],
            include: [{
                model: sheduleModel,
                attributes: [ 'date', 'time','weekday' ],
                where: { date: date || Tdate }
            }]
        }];
        const data = await teacherclass.findOne({ include: IncludeOption, where: { studentId: studentId } });
        if (data == null) {
            return next(new AppError('No have any Shedule Today', 'not_found'));
        }
        return res.status(200).json({ success: true, StatusCode: 200, data: data, message: 'Data Finded Successfully' });
    }
}