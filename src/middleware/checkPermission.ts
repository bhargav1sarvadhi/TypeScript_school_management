import AppError from '../utils/genrateError';
const enum Roles {
  PRINCIPAL = 'Principal',
  TEACHER = 'Teacher',
  STUDENT = 'Student',
}

const checkPermission = role => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!userRole) {
            throw new AppError('You have not access.', 'unauthorized');
        }
        if (userRole === role || userRole === 'Principal') {
            return next();
        }
        throw new AppError('You have not access.', 'unauthorized');
    };
};

const Onlystudent = role => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!userRole) {
            throw new AppError('You have not access.', 'unauthorized');
        }
        if (userRole === role) {
            return next();
        }
        throw new AppError('You have not access.', 'unauthorized');
    };
};

export { Roles, checkPermission ,Onlystudent };
