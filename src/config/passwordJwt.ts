import passport from 'passport';
import { db } from '../model';
import passport_jwt from 'passport-jwt';
// import jwt,{ JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
// import { AppError } from '../utils';
dotenv.config();
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

// export const validateInviteLink = (req,res,next,token) => {
//     try {
//         const decodedToken: JwtPayload = jwt.verify(token, process.env.JWT_SECERET) as JwtPayload;
//         if (decodedToken.exp >= Math.floor(Date.now() / 1000)) {
//             next();
//         } else {
//             return next(new AppError('Oops! The link you are trying to access has expired.', 'invalid_request'));
//         }
//     } catch (error) {
//         return next(new AppError('Oops! The link you are trying to access has expired.', 'invalid_request'));

//     }
// };
