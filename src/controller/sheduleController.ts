import { db } from '../model/index';
import { BaseController } from './BaseController';
const sheduleModel = db.sheduleModel;

export class SheduleController extends BaseController {
    constructor() {
        super(sheduleModel);
    }
}