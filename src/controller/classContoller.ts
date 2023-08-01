import { db } from '../model/index';
import { BaseController } from './BaseController';
const classModel = db.classModel;

export class ClassController extends BaseController {
    constructor() {
        super(classModel);
    }
}