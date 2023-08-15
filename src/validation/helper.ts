import { errorTypes } from '../utils/errorTypes';
import AppError from '../utils/genrateError';

export const validateRequest = (req, next, schema) => {
    const options = {
        abortEarly: false, 
        allowUnknown: true, 
        stripUnknown: true,
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        throw new AppError(
            `Validation error: ${error.details.map(x => x.message).join(', ')}`,
            errorTypes.invalid_request,
        );
    } else {
        req.body = value;
        next();
    }
};
