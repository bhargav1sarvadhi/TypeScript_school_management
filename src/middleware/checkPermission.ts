import AppError from '../utils/genrateError';
const enum Roles {
  PRINCIPAL = 'Principal',
  TEACHER = 'Teacher',
  STUDENT = 'Student',
}

export default function checkPermission(roles) {
    return function (req, res, next) {
        if (roles.includes(req.user.role)) {
            return next();
        }
        throw new AppError('You do not have permission to access this route.', 'Forbidden');
    };
}
export { Roles, checkPermission };
