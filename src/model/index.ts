import { sequelize } from '../config/db';
import { Sequelize } from 'sequelize';
import { UserModel } from './userModel';
import { classModel } from './classModel';
import { attendanceModel } from './attendanceModel';
import { sheduleModel } from './scheduleModel';
import { reportModel } from './reportingModel';
import { teacherClasstModel } from './teacherClassModel';
import { StudentModel } from './studentModel';
import { subjectModel } from './subjectModel';
import { holidayModel } from './holidayModel';
import { LeaveModel } from './leaveModel';

export const db = {
    sequelize,
    Sequelize,
    UserModel,
    classModel,
    attendanceModel,
    sheduleModel,
    reportModel,
    teacherClasstModel,
    StudentModel,
    subjectModel,
    holidayModel,
    LeaveModel,
};

db.sequelize.sync();
