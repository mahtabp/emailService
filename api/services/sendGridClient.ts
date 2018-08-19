import * as request from 'request-promise';
import * as config from 'config';
import { logger } from '../infrastructure/logger';
import { EmailPayload } from '../models/emailPayload';
import { ErrorHandler } from '../models/errorHandler';

interface SendGridPayload {
    personalizations: [{
        to: {}[],
        cc?: {}[],
        bcc?: {}[],
        subject: string
    }],
    from: {
        email: string
    },
    content: [
        {
            type: "text/plain",
            value: string
        }
    ]
}

export function createSendGridPayload(emailPayload: EmailPayload) {
    var payload: SendGridPayload = {
        personalizations: [{
            to: buildEmailArray(emailPayload.to),
            subject: emailPayload.subject
        }],
        from: {
            email: emailPayload.from
        },
        content: [
            {
                type: "text/plain",
                value: emailPayload.text
            }
        ]
    }

    if (emailPayload.cc !== undefined && emailPayload.cc !== null) {
        payload.personalizations[0].cc = buildEmailArray(emailPayload.cc);
    }

    if (emailPayload.bcc !== undefined && emailPayload.bcc !== null) {
        payload.personalizations[0].bcc = buildEmailArray(emailPayload.bcc);
    }

    return payload;
}

function buildEmailArray(emails: string) {
    var emailArrays = emails.split(',');
    return emailArrays.map(e => {
        return { email: e.trim() };
    });
}

export async function sendRequest(payload: any) {
    try {
        logger.debug('SendGridClient.sendRequest');
        const apiKey = config.get<string>('sendGrid.apiKey');
        var response = await request.post(
            {
                uri: `https://api.sendgrid.com/v3/mail/send`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`
                },
                body: payload,
                json: true
            }
        );
        logger.debug(`Sending Email by SendGrid was successful.`);
    } catch (err) {
        logger.error(`[FAILED] SendGridClient.sendRequest: ${err.statusCode} - ${err.error.errors} `);
        throw new ErrorHandler(
            err.statusCode,
            err.error.errors.map(e => e.message)
        );
    }
}