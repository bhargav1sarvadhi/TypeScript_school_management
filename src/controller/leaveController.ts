import { WhereOptions } from 'sequelize';
import { classModel } from '../model/classModel';
import { db } from '../model/index';
import { teacherClasstModel } from '../model/teacherClassModel';
import { AppError } from '../utils';
import { BaseController } from './BaseController';
const leaveModel = db.LeaveModel;

// async function aproveLeave(id) {
//     console.log(id);
//     const aproveLeave = await leaveModel.update({ status: 'Approve' }, { where: { id }});
//     return aproveLeave;
// };

// async function rejectLeave(id) {
//     const rejectLeave = await leaveModel.update({ status: 'Reject' }, { where: { id }});
//     return rejectLeave;
// };

export class LeaveController extends BaseController {
    constructor() {
        super(leaveModel);
    }

    async applyLeave(req, res, next) {
        if (req.user.role == 'Teacher') {
            req.body.teacherId = req.user.id;
            req.body.role = req.user.role;
            const leavedata = await leaveModel.create(req.body);
            return res.status(201).json({ success: true, StatusCode: 201, data: leavedata, message: 'Data Insert Successfully' });
        }
        req.body.studentId = req.user.id;
        req.body.role = req.user.role;
        const leavedata = await leaveModel.create(req.body);
        return res.status(201).json({ success: true, StatusCode: 201, data: leavedata, message: 'Data Insert Successfully' });
    }
    async aprove(id) {
        const aproveLeave = await leaveModel.update({ status: 'Approve' }, { where: { id }});
        return aproveLeave;
    }
    async getStudent(req, res, next) {
        const getLeaves = await leaveModel.findAll({ where: { studentId: req.user.id }});
        res.status(200).json({ success: true, StatusCode: 200, data: getLeaves, message: 'Data Finded Successfully' });
    }
    async getTeacher(req, res, next) {
        const getLeaves = await leaveModel.findAll({ where: { teacherId: req.user.id }});
        res.status(200).json({ success: true, StatusCode: 200, data: getLeaves, message: 'Data Finded Successfully' });
    }

    async PrincipalGetLeave(req, res, next) {
        const role = 'Teacher';
        const showleaves = await leaveModel.findAll({ where: { role }});
        res.status(200).json({ success: true, StatusCode: 200, data: showleaves, message: 'Data Finded Successfully' });
    }
    async teacherGetLeave(req, res, next) {
        const classT = await classModel.findOne({ where: { classTeacher: req.user.id }});
        const classid = classT.id;
        const role = 'Student';
        const showleaves = await leaveModel.findAll({
            include: [{
                model: teacherClasstModel,
                attributes: ['classId'],
                where: { classId: classid },
            }],where: { role }});
        res.status(200).json({ success: true, StatusCode: 200, data: showleaves, message: 'Data Finded Successfully' });
    }
    async AproveLeave(req, res, next) {
        const { params: { id }} = req;
        // const aproved = await aproveLeave(id);
        const aproveLeave = await leaveModel.update({ status: 'Approve' }, { where: { id }});
        res.status(200).json({ success: true, StatusCode: 200, data: aproveLeave, message: 'leave aproved Successfully' });
    }
    async RejectLeave(req, res, next) {
        const { params: { id }} = req;
        // const rejected = await rejectLeave(id);
        const rejectLeave = await leaveModel.update({ status: 'Reject' }, { where: { id }});
        res.status(200).json({ success: true, StatusCode: 200, data: rejectLeave, message: 'leave rjected Successfully' });
    }
}

