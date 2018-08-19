import * as service from '../../api/services/emailDistributer';
import * as mailGun from '../../api/services/mailGunClient';
import * as sendGrid from '../../api/services/sendGridClient';
import * as sinon from 'sinon';
import { expect } from 'chai';

describe('emailDistributer', function () {
    var sandbox = sinon.sandbox.create();
    let sendRequestMailGunStub;
    let sendRequestSendGridStub;
    let createMailGunPayloadStub;
    let createSendGridPayloadStub;

    const payload = {
        from: 'sender@abc.com',
        to: 'recipient@abc.com',
        subject: 'subject of the email',
        text: 'this is the content'
    };

    beforeEach(() => {
        sendRequestMailGunStub = sandbox.stub(mailGun, 'sendRequest');
        sendRequestSendGridStub = sandbox.stub(sendGrid, 'sendRequest');
        createMailGunPayloadStub = sandbox.stub(mailGun, 'createMailGunPayload');
        createSendGridPayloadStub = sandbox.stub(sendGrid, 'createSendGridPayload');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('sendEmail() mail Gun succeeds', async function () {
        createMailGunPayloadStub.returns(payload);
        sendRequestMailGunStub.withArgs(payload);

        await service.sendEmail(payload);

        sinon.assert.called(sendRequestMailGunStub);
    });

    it('sendEmail() mail Gun fails, sendGrid succeeds', async function () {
        createMailGunPayloadStub.returns(payload);
        sendRequestMailGunStub.throws('some error');

        createSendGridPayloadStub.returns(payload);
        sendRequestSendGridStub.withArgs(payload);

        await service.sendEmail(payload);

        sinon.assert.called(sendRequestMailGunStub);
        sinon.assert.called(sendRequestSendGridStub);
    });

    it('sendEmail() both services fail, throw error', async function () {
        createMailGunPayloadStub.returns(payload);
        sendRequestMailGunStub.throws(new Error('some error'));
        createSendGridPayloadStub.returns(payload);
        sendRequestSendGridStub.throws(new Error('another error'));

        try {
            await service.sendEmail(payload);
        } catch (err) {
            expect(err).not.null;
        }

        sinon.assert.called(sendRequestMailGunStub);
        sinon.assert.called(sendRequestSendGridStub);
    });
})