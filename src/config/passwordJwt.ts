import passport from 'passport';
import { db } from '../model';
import passport_jwt from 'passport-jwt';
const UserModel = db.UserModel;
const TokenModel = db.tokenModel;
const JwtStrategy = passport_jwt.Strategy,
    ExtractJwt = passport_jwt.ExtractJwt;
const opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECERET;

passport.use(
    new JwtStrategy(opts, async function (jwt_payload: any, done: any) {
        try {
            const id: any = jwt_payload.id;
            const checkloginUser = await TokenModel.findOne({
                where: { userId: id },
            });
            if (!checkloginUser) {
                return done(null, false);
            } else {
                const user = await UserModel.findByPk(id);
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }
        } catch (err) {
            return done(err, false);
        }
    }),
);
