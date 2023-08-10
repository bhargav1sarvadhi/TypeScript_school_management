/* eslint-disable max-len */
import { validateRequest } from './helper';
import Joi from 'joi';

const createAccountSchema = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        phone: Joi.string().pattern(/^\+[0-9]{1,}$/).length(13).required().messages({
            'string.pattern.base': 'please enter valid number using +91',
            'string.length': 'Please enter 10 digits mobile number'
        }),
        email: Joi.string().email().required(),
        role: Joi.string().required(),
        password: Joi.string().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/).required().messages({
            'string.pattern.base': 'please valid password number special characters and letters'
        }),
    });
    validateRequest(req, next, schema);
};
const studentSchema = (req, res, next) => {
    const schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        grId: Joi.number().required(),
        phone: Joi.string().pattern(/^\+[0-9]{1,}$/).length(13).required().messages({
            'string.pattern.base': 'please enter valid number using +91',
            'string.length': 'Please enter 10 digits mobile number'
        }),
        email: Joi.string().email().required(),
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
        classTeacher: Joi.string().required(),
    });
    validateRequest(req, next, schema);
};
const attendanceSchema = (req, res, next) => {
    const schema = Joi.object({
        studentId: Joi.string().required(),
        date: Joi.date().iso().required(),
        status: Joi.string().required(),
    });
    const arrayOfStudentsSchema = Joi.array().items(schema).min(1).required();
    validateRequest(req, next, arrayOfStudentsSchema);
};
const sheduleSchema = (req, res, next) => {
    const schema = Joi.object({
        classId: Joi.number().required(),
        time: Joi.string().required(),
        date: Joi.date().iso().required(),
    });
    validateRequest(req, next, schema);
};
const reportSchema = (req, res, next) => {
    const schema = Joi.object({
        teacherId: Joi.string(),
        studentId: Joi.string().required(),
        description: Joi.string().required(),
        timestamp: Joi.string(),
    });
    validateRequest(req, next, schema);
};
const teacherClassSchema = (req, res, next) => {
    const schema = Joi.object({
        classId: Joi.number(),
        studentId: Joi.string().required(),
    });
    validateRequest(req, next, schema);
};
const subjectSchema = (req, res, next) => {
    const schema = Joi.object({
        subjectname: Joi.string().required(),
        teacherId: Joi.string().required(),
    });
    validateRequest(req, next, schema);
};
const holidaySchema = (req, res, next) => {
    const schema = Joi.object({
        holidayname: Joi.string().required(),
        date: Joi.date().iso().required(),
    });
    validateRequest(req, next, schema);
};
const leaveSchema = (req, res, next) => {
    const schema = Joi.object({
        startdate: Joi.date().iso().required(),
        enddate: Joi.date().iso().required(),
        reason: Joi.string().required(),
        status: Joi.string(),
        role: Joi.string(),
    });
    validateRequest(req, next, schema);
};
const updatePasswordSchema = (req, res, next) => {
    const schema = Joi.object({
        password: Joi.string().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/).required().messages({
            'string.pattern.base': 'please valid password number special characters and letters'
        }),
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
    studentSchema,
    updatePasswordSchema,
    subjectSchema,
    holidaySchema,
    leaveSchema
};
