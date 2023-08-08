import { db } from '../model/index';
import { BaseController } from './BaseController';
const holidaytModel = db.holidayModel;

export class HolidayController extends BaseController {
    constructor() {
        super(holidaytModel);
    }
}