import { db } from '../model/index';
import { BaseController } from './BaseController';
const homeworkModel = db.homeworkModel;

export class HomeworkController extends BaseController {
    constructor() {
        super(homeworkModel);
    }
}