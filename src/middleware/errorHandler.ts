/* eslint-disable @typescript-eslint/no-unused-vars */
import { logger } from '../logger/Logger';
import { errorTypes } from '../utils/errorTypes';
import { Response, Request, NextFunction } from 'express';

function CraeteCustomError(error, statusCode: number, res) {
    const ErrorObj = { statusCode, message: error.message };
    return res.status(statusCode).send(ErrorObj);
}

export function errorhandler(
    error,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (error.errorName === undefined) {
        switch (error instanceof Error) {
            case error.name === 'SequelizeValidationError':
                logger.error(`${error.message}`);
                return CraeteCustomError(error.errors[0], 400, res);
            case error.name === 'SequelizeUniqueConstraintError':
                logger.error(`${error.message}`);
                return CraeteCustomError(error.errors[0], 409, res);
            default:
                logger.error(`${error.message}`);
                CraeteCustomError(error, 500, res);
                break;
        }
    } else {
        switch (error.errorName) {
            case errorTypes.forbidden:
                logger.error(`${error.message}`);
                CraeteCustomError(error, 403, res);
                break;

            case errorTypes.not_found:
                logger.error(`${error.message}`);
                CraeteCustomError(error, 404, res);
                break;

            case errorTypes.conflict:
                logger.error(`${error.message}`);
                CraeteCustomError(error, 404, res);
                break;

            case errorTypes.invalid_request:
                logger.error(`${error.message}`);
                CraeteCustomError(error, 404, res);
                break;

            case errorTypes.validation_error:
                logger.error(`${error.message}`);
                CraeteCustomError(error, 400, res);
                break;

            case errorTypes.unknown_error:
                logger.error(`${error.message}`);
                CraeteCustomError(error, 500, res);
                break;

            case errorTypes.unauthorized:
                logger.error(`${error.message}`);
                CraeteCustomError(error, 401, res);
                break;
            default:
                logger.error(`${error.message}`);
                CraeteCustomError(error, 500, res);
                break;
        }
    }
}