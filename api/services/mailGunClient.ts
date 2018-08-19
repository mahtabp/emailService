import * as request from 'request-promise';
import * as config from 'config';
import { logger } from '../infrastructure/logger';
import { EmailPayload } from '../models/emailPayload';
import { ErrorHandler } from '../models/errorHandler';

interface MailGunPayload {
    from: string,
    to: string, // Example: "Bob <bob@host.com>". You can use commas to separate multiple recipients.
    subject: string,
    text: string,
    cc?: string,
    bcc?: string
}

export function createMailGunPayload(emailPayload: EmailPayload): MailGunPayload {
    var mailgunPayload: MailGunPayload = {
        from: emailPayload.from,
        to: emailPayload.to,
        subject: emailPayload.subject,
        text: emailPayload.text
    }

    if (emailPayload.cc !== undefined) {
        mailgunPayload.cc = emailPayload.cc;
    }

    if (emailPayload.bcc !== undefined) {
        mailgunPayload.bcc = emailPayload.bcc;
    }

    return mailgunPayload;
}

export async function sendRequest(payload: MailGunPayload) {
    try {
        logger.debug('mailGunService.sendRequest');
        const apiKey = config.get<string>('mailGun.apiKey');
        const mailDomain = config.get<string>('mailGun.domain');
        var response = await request.post(
            `https://api:${apiKey}@api.mailgun.net/v3/${mailDomain}/messages`,
            {
                form: {
                    from: payload.from,
                    to: payload.to,
                    subject: payload.subject,
                    text: payload.text,
                    cc: payload.cc,
                    bcc: payload.bcc
                }
            }
        );
        logger.debug(`Sending Email was successful by mailGun.`);
    } catch (err) {
        logger.error(`[FAILED] mailGunService.sendRequest: ${err.statusCode} - ${JSON.stringify(err.error, null, 2)} `);
        throw new ErrorHandler(
            err.statusCode,
            err.error
        );
    }

}