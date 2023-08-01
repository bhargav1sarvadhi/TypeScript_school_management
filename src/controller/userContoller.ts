import { db } from '../model/index';
import { BaseController } from './BaseController';
const UserModel = db.UserModel;

export class UserController extends BaseController {
    constructor() {
        super(UserModel);
    }
}
