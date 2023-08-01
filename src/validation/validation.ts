/* eslint-disable max-len */
import { validateRequest } from './helper';
import Joi from 'joi';

const createAccountSchema = (req, res, next) => {
    const schema = Joi.object({
        userName: Joi.string().required(),
        email: Joi.string().email().required(),
        role: Joi.string().required(),
        password: Joi.string().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/).required().messages({
            'string.pattern.base': 'please valid password number special characters and letters'
        }),
    });
    validateRequest(req, next, schema);
};
const classSchema = (req, res, next) => {
    const schema = Joi.object({
        className: Joi.string().required(),
        grade: Joi.string().required(),
        classTeacher: Joi.number().required(),
    });
    validateRequest(req, next, schema);
};
const attendanceSchema = (req, res, next) => {
    const schema = Joi.object({
        studentId: Joi.number().required(),
        date: Joi.date().iso().required(),
        status: Joi.string().required(),
    });
    validateRequest(req, next, schema);
};
const sheduleSchema = (req, res, next) => {
    const schema = Joi.object({
        classId: Joi.number().required(),
        weekday: Joi.string().required(),
        time: Joi.string().required(),
        date: Joi.date().iso().required(),
    });
    validateRequest(req, next, schema);
};
const reportSchema = (req, res, next) => {
    const schema = Joi.object({
        teacherId: Joi.number(),
        studentId: Joi.number().required(),
        description: Joi.string().required(),
        timestamp: Joi.string(),
    });
    validateRequest(req, next, schema);
};
const teacherClassSchema = (req, res, next) => {
    const schema = Joi.object({
        classId: Joi.number(),
        studentId: Joi.number().required(),
    });
    validateRequest(req, next, schema);
};

export {
    createAccountSchema,
    classSchema,
    attendanceSchema,
    sheduleSchema,
    reportSchema,
    teacherClassSchema,
};
