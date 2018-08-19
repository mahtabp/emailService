import * as service from '../../api/services/mailGunClient';
import { expect } from 'chai';

describe('mailGunClient', function () {
    it('createMailGunPayload() all required fields exist', function () {
        var payload = {
            from: 'maz@abc.com',
            to: 'Jimmy@abc.com',
            subject: 'Hello',
            text: 'email content'
        }
        var actual = service.createMailGunPayload(payload);
        expect(actual).eql({
            from: 'maz@abc.com',
            to: 'Jimmy@abc.com',
            subject: 'Hello',
            text: 'email content'
        });
    });

    it('sendRequest() has multiple recipient', function () {
        var payload = {
            from: 'maz@abc.com, mike@wer.go',
            to: 'Jimmy@abc.com',
            subject: 'Hello',
            text: 'email content'
        }
        var actual = service.createMailGunPayload(payload);
        expect(actual).eql({
            from: 'maz@abc.com, mike@wer.go',
            to: 'Jimmy@abc.com',
            subject: 'Hello',
            text: 'email content'
        });
    });

    it('sendRequest() has multiple cc', function () {
        var payload = {
            from: 'maz@abc.com, mike@wer.go',
            to: 'Jimmy@abc.com',
            subject: 'Hello',
            text: 'email content',
            cc: 'joel@abc.com, james <james@wer.go>'
        }
        var actual = service.createMailGunPayload(payload);
        expect(actual).eql({
            from: 'maz@abc.com, mike@wer.go',
            to: 'Jimmy@abc.com',
            subject: 'Hello',
            text: 'email content',
            cc: 'joel@abc.com, james <james@wer.go>'
        });
    });

    it('sendRequest() has multiple bcc', function () {
        var payload = {
            from: 'maz@abc.com, mike@wer.go',
            to: 'Jimmy@abc.com',
            subject: 'Hello',
            text: 'email content',
            bcc: 'joel@abc.com, james <james@wer.go>'
        }
        var actual = service.createMailGunPayload(payload);
        expect(actual).eql({
            from: 'maz@abc.com, mike@wer.go',
            to: 'Jimmy@abc.com',
            subject: 'Hello',
            text: 'email content',
            bcc: 'joel@abc.com, james <james@wer.go>'
        });
    });

})