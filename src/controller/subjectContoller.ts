import { db } from '../model/index';
import { BaseController } from './BaseController';
const subjectModel = db.subjectModel;

export class SubjectController extends BaseController {
    constructor() {
        super(subjectModel);
    }
}