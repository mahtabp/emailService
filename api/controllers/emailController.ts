import * as express from 'express';
import { logger } from '../infrastructure/logger';
import * as validationHelper from '../services/validationHelpers';
import * as emailDistributor from '../services/emailDistributer';
import { buildEmailPayload } from '../models/emailPayload';
import { ErrorCodes } from '../models/errorCodes';
import { ErrorHandler } from '../models/errorHandler';

export function getStatus(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(200).send('OK');
}

export async function sendEmail(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        logger.info('[BEGIN] sendEmail ' + JSON.stringify(req.body));
        var emailPayload = buildEmailPayload(req.body);
        if (!validationHelper.validateRequestBody(emailPayload)) {
            return res.status(400).send(new ErrorHandler(ErrorCodes.InvalidRequestParameters.code, ErrorCodes.InvalidRequestParameters.description));
        }

        if (!validationHelper.areEmailAddressesValid(emailPayload.from) ||
            !validationHelper.areEmailAddressesValid(emailPayload.to)) {
            return res.status(400).send(new ErrorHandler(ErrorCodes.InvalidEmail.code, ErrorCodes.InvalidEmail.description));
        }

        await emailDistributor.sendEmail(emailPayload);
        logger.info('[SUCCESSFUL] sendEmail.');
        res.status(200).send('OK');
    } catch (err) {
        logger.error(`[ERROR] sendEmail failed. Reason: ${JSON.stringify(err)} `);
        next(err);
    }
}

