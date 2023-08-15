import { db } from '../model/index';
import { BaseController } from './BaseController';
const reportModel = db.reportModel;

export class ReportController extends BaseController {
    constructor() {
        super(reportModel);
    }

    async creatreport(req, res, next) {
        req.body.teacherId = req.user.id;
        const data = await reportModel.create(req.body);
        res.status(201).json({ success: true, StatusCode: 201, data: data, message: 'Data Insert Successfully' });
    }
}