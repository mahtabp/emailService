// the abstraction send email
import * as mailGun from './mailGunClient';
import * as sendGrid from './sendGridClient';
import { logger } from '../infrastructure/logger';
import { EmailPayload } from '../models/emailPayload';

export async function sendEmail(emailPayload: EmailPayload) {
    try {
        var mailGunPayload = mailGun.createMailGunPayload(emailPayload);
        await mailGun.sendRequest(mailGunPayload);
    } catch (err) {
        logger.error('[ERROR] mailGun failed, switching over to sendGrid');
        try {
            var sendGridPayload = sendGrid.createSendGridPayload(emailPayload);
            await sendGrid.sendRequest(sendGridPayload);
        } catch (err) {
            logger.error('[ERROR] both service providers failed');
            // TODO: save the data to send the emails when services are up again
            throw err;
        }
    }

}
