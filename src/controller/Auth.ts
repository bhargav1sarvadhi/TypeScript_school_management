/* eslint-disable no-var */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/genrateError';
import * as bcrypt from 'bcrypt';
import { db } from '../model';
import jwt from 'jsonwebtoken';
import { StudentModel } from '../model/studentModel';
const UserModel = db.UserModel;
const Token = db.tokenModel;

export class AuthContoller {
    async login(req, res, next) {
        const { body: { email, password }} = req;
        const login = await UserModel.findOne({ where: { email }});
        if (!login || !bcrypt.compareSync(password, login.password)) {
            throw new AppError('please Check details', 'not_found');
        }
        const JWT_SECRET = process.env.JWT_SECERET;
        const payload = { id: login.id };
        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: 3600,
            algorithm: 'HS256'
        });
        const [rowsAffected] = await Token.update(
            { token },
            { where: { userId: login.id }}
        );
        if (rowsAffected === 0) {
            await Token.create({ token, userId: payload.id });
        }
        res.status(200).json({ success: true, StatusCode: 201, data: token, message: 'login Successfully' });
    }

    async logout(req, res: Response, next: NextFunction) {
        console.log(req.user);
        const data = await Token.destroy({ where: { userId: req.user.id }});
        if (!data || data == 0) {
            throw new AppError('Somthing went wrong not logout user', 'not_found');
        }
        res.status(200).json({ success: true, StatusCode: 200, message: 'logout Successfully' });
    }
}

