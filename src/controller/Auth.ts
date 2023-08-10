/* eslint-disable max-len */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/genrateError';
import * as bcrypt from 'bcrypt';
import { db } from '../model';
import jwt from 'jsonwebtoken';
import { StudentModel } from '../model/studentModel';
import session from 'express-session';
const UserModel = db.UserModel;

export class AuthContoller {
    async login(req, res, next) {
        const { body: { email, password }} = req;
        const login = await UserModel.findOne({ where: { email }}) || await StudentModel.findOne({ where: { email }});
        if (!login || !bcrypt.compareSync(password, login.password)) {
            throw new AppError('please Check details', 'not_found');
        }
        const JWT_SECRET = process.env.JWT_SECERET;
        const payload = { id: login.id,email: login.email };
        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: 3600,
            algorithm: 'HS256'
        });
        req.session.token = token;
        res.status(200).json({ success: true, StatusCode: 201, data: token, message: 'login Successfully' });
    }

    async logout(req, res: Response, next: NextFunction) {
        if (req.user) {
            req.session.destroy(err => {
                if (err) {
                    throw new AppError('error in logout', 'not_found');
                }
            });
            res.status(200).json({ success: true, StatusCode: 200, message: 'logout Successfully' });
        }
    }
}