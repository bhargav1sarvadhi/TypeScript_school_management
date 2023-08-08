import AppError from '../utils/genrateError';
const enum Roles {
  PRINCIPAL = 'Principal',
  TEACHER = 'Teacher',
  STUDENT = 'Student',
}

export default function checkPermission(roles) {
    return function (req, res, next) {
        if (Array.isArray(roles)) {
            if (roles.includes(req.user.role)) {
                return next();
            }
        } else if (req.user.role === roles) {
            return next();
        }
        throw new AppError('You do not have permission to access this route.', 'Forbidden');
    };
}
export { Roles, checkPermission };
