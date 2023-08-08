/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from '../model/index';
import jwt,{ JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { AppError, NotificationType } from '../utils';
import { Sendnotification, createToken } from '../utils/notificationEmail';
import { BaseController } from './BaseController';
import { WhereOptions } from 'sequelize';
const UserModel = db.UserModel;
const sendnotification = new Sendnotification;

export function expirescheck(token) {
    const decodedToken: JwtPayload = jwt.verify(token, process.env.JWT_SECERET) as JwtPayload;
    if (decodedToken.exp >= Math.floor(Date.now() / 1000)){
        return;
    } else {
        throw new AppError('Oops! The link you are trying to access has expired.', 'invalid_request');
    }
}

export class UserController extends BaseController {
    constructor() {
        super(UserModel);
    }
    async singup(req, res, next) {
        const data = await UserModel.create(req.body);
        if (data) {
            const token = createToken(data.id);
            sendnotification.Send(NotificationType.INVITE,{ emailAddress: data.email, message: `Hello ${data.firstname}`,id: data.id ,link: `http://localhost:8000/newuser/password-generate/${data.id}/${token}` });
        }
        res.status(201).json({ success: true, StatusCode: 201, data: data, message: 'Data Insert Successfully' });
    }

    async userInvite(req, res,next) {
        const { params: { emailId, token }} = req;
        expirescheck(token);
        const decodedToken: JwtPayload = jwt.verify(token, process.env.JWT_SECERET) as JwtPayload;
        return res.status(200).json({ success: true, StatusCode: 200, message: 'Successfully link opened' });
    }

    async updatePassword(req, res, next) {
        const { params: { emailId, token }} = req;
        expirescheck(token);
        const [updateData] = await UserModel.update(req.body, { where: { id: emailId } as WhereOptions });
        if (updateData === 0) {
            return next(new AppError(`This id = ${emailId} not found`, 'not_found'));
        }
        res.status(200).json({ success: true, StatusCode: 200, data: updateData, message: 'Data Update Successfully' });
    }
}