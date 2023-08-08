/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { db } from '../model/index';
import { AppError, NotificationType, Sendnotification } from '../utils';
import { BaseController } from './BaseController';
import { expirescheck } from './userContoller';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { WhereOptions } from 'sequelize';
import { createToken } from '../utils/notificationEmail';
dotenv.config();
const studentClasstModel = db.StudentModel;
const sendnotification = new Sendnotification;

export class StudentsController extends BaseController {
    constructor() {
        super(studentClasstModel);
    }

    async studentsingup(req, res, next) {
        const data = await studentClasstModel.create(req.body);
        if (data) {
            const token = createToken(data.id);
            sendnotification.Send(NotificationType.INVITE,{ emailAddress: data.email, message: `Hello ${data.firstname}`,id: data.id ,link: `http://localhost:8000/newuser/student/password-generate/${data.id}/${token}` });
        }
        res.status(201).json({ success: true, StatusCode: 201, data: data, message: 'Data Insert Successfully' });
    }

    async studentInvite(req, res,next) {
        const { params: { emailId, token }} = req;
        expirescheck(token);
        const decodedToken: JwtPayload = jwt.verify(token, process.env.JWT_SECERET) as JwtPayload;
        return res.status(200).json({ success: true, StatusCode: 200, message: 'Successfully link opened' });
    }

    async studentupdatePassword(req, res, next) {
        const { params: { emailId, token }} = req;
        console.log(emailId);
        expirescheck(token);
        const [updateData] = await studentClasstModel.update(req.body, { where: { id: emailId } as WhereOptions });
        console.log(updateData);
        if (updateData === 0) {
            return next(new AppError(`This id = ${emailId} not found`, 'not_found'));
        }
        res.status(200).json({ success: true, StatusCode: 200, data: updateData, message: 'Data Update Successfully' });
    }
}