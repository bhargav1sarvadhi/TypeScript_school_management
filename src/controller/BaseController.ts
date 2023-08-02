/* eslint-disable @typescript-eslint/no-unused-vars */
import { hashSync } from 'bcrypt';
import AppError from '../utils/genrateError';
import { Request, Response, NextFunction } from 'express';

export class BaseController {
    model;
    constructor(model) {
        this.model = model;
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const data = await this.model.create(req.body);
        res.status(201).json({ success: true, StatusCode: 201, data: data, message: 'Data Insert Successfully' });
    }
    async get(req, res: Response, next: NextFunction) {
        console.log(req.user);
        const data = await this.model.findAll();
        res.status(200).json({ success: true, StatusCode: 200, data: data, message: 'Data Finded Successfully' });
    }
    async update(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const [updated] = await this.model.update(req.body, { where: { id }});
        if (updated) {
            const updatedData = await this.model.findByPk(id);
            res.status(200).json({ success: true, StatusCode: 200, data: updatedData, message: 'Data Update Successfully' });
        } else {
            return next(new AppError(`This id = ${id} not found`, 'not_found'));
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const deleted = await this.model.destroy({ where: { id }});
        if (deleted) {
            res.status(200).json({ success: true, statusCode: 200, data: deleted, message: 'Data deleted Successfully' });
        } else {
            return next(new AppError(`id = ${id}  not found/Match`, 'not_found'));
        }
    }
    async bulkinsert(req, res, next) {
        const user = req.body;
        const userHashed = user.map(val => {
            if (val.password) {
                const hashpass = hashSync(val.password, 12);
                val.password = hashpass;
                return val;
            }
            return val;
        });
        const bulkinsert = await this.model.bulkCreate(userHashed);
        return res.status(201).json({ success: true, StatusCode: 201, data: bulkinsert, message: 'Data Insert Successfully' });
    }
}