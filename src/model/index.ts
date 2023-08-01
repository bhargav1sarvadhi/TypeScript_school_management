import { sequelize } from '../config/db';
import { Sequelize } from 'sequelize';
import { UserModel } from './userModel';
import { tokenModel } from './tokenModel';
import { classModel } from './classModel';
import { attendanceModel } from './attendanceModel';
import { sheduleModel } from './seheduleModel';
import { reportModel } from './reportingModel';
import { teacherClasstModel } from './teacherClassModel';

// eslint-disable-next-line max-len
export const db = {
    sequelize,
    Sequelize,
    UserModel,
    tokenModel,
    classModel,
    attendanceModel,
    sheduleModel,
    reportModel,
    teacherClasstModel,
};

// db.sequelize.sync({ force: false });
