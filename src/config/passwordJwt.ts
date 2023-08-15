import passport from 'passport';
import { db } from '../model';
import passport_jwt from 'passport-jwt';
import dotenv from 'dotenv';
import { StudentModel } from '../model/studentModel';
dotenv.config();
const UserModel = db.UserModel;

const JwtStrategy = passport_jwt.Strategy,
    ExtractJwt = passport_jwt.ExtractJwt;
const opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECERET;

passport.use(
    new JwtStrategy(opts, async function (jwt_payload: any, done: any) {
        try {
            const user = await UserModel.findOne({ where: { id: jwt_payload.id }}) || await StudentModel.findOne({ where: { id: jwt_payload.id }});
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    }),
);