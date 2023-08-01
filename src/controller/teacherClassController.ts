import { db } from '../model/index';
import AppError from '../utils/genrateError';
import { BaseController } from './BaseController';
const teacherClasstModel = db.teacherClasstModel;

export class TeacherclassController extends BaseController {
    constructor() {
        super(teacherClasstModel);
    }
    async removeStudent(req, res, next) {
        const { id } = req.params;
        const deleted = await teacherClasstModel.destroy({ where: { studentId: id }});
        if (deleted) {
            res.status(200).json({ success: true, statusCode: 200, data: deleted, message: 'Data deleted Successfully' });
        } else {
            return next(new AppError(`id = ${id}  not found/Match`, 'not_found'));
        }
    }
}
