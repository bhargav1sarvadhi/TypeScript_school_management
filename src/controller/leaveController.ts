/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from '../model/index';
import { BaseController } from './BaseController';
const leaveModel = db.LeaveModel;

export class LeaveController extends BaseController {
    constructor() {
        super(leaveModel);
    }

    async applyLeave(req, res, next) {
        console.log(req.user.role);
        if (req.user.role == 'Teacher') {
            req.body.teacherId = req.user.id;
            const leavedata = await leaveModel.create(req.body);
            return res.status(201).json({ success: true, StatusCode: 201, data: leavedata, message: 'Data Insert Successfully' });
        }
        req.body.studentId = req.user.id;
        const leavedata = await leaveModel.create(req.body);
        return res.status(201).json({ success: true, StatusCode: 201, data: leavedata, message: 'Data Insert Successfully' });
    }
}