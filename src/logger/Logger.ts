import { createLogger, format, transports } from 'winston';
import { DATE_FORMATE } from '../utils/dataFormate';

export const logger = createLogger({
    transports: [
        new transports.Console({
            level:
        'info' || 'error' || 'warn' || 'fatal' || 'debug' || 'trace' || 'silly',
            format: format.combine(
                format.timestamp({ format: DATE_FORMATE.TIMESTAMP }),
                format.printf(
                    info => `${info.timestamp} ${info.level}: ${info.message}`,
                ),
            ),
        }),
    ],
});
