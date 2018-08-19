import * as winston from 'winston';
import * as path from 'path';
import * as fs from 'fs';

const logPath = 'logs'

if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath);
}

export const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: path.join(logPath, 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(logPath, 'emailService.log') })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}
