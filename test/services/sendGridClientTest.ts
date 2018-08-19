import * as service from '../../api/services/sendGridClient';
import { expect } from 'chai';

describe('sendGridClient', function () {
    it('createSendGridPayload() all required fields exist', function () {
        var payload = {
            from: 'mahtab@gmail.com',
            to: 'Jimmy@abc.com',
            subject: 'Hello, from sendGrid!',
            text: 'This is the email body'
        }
        var actual = service.createSendGridPayload(payload);
        expect(actual).eql({
            personalizations: [
                {
                    to: [
                        {
                            email: 'Jimmy@abc.com'
                        }
                    ],
                    subject: 'Hello, from sendGrid!'
                }
            ],
            from: {
                email: 'mahtab@gmail.com'
            },
            content: [
                {
                    type: 'text/plain',
                    value: 'This is the email body'
                }
            ]
        });
    });

    it('createSendGridPayload() has 1 cc', function () {
        var payload = {
            from: 'mahtab@gmail.com',
            to: 'Jimmy@abc.com',
            subject: 'Hello, from sendGrid!',
            text: 'This is the email body',
            cc: 'fiftycents@gym.com'
        }
        var actual = service.createSendGridPayload(payload);
        expect(actual).eql({
            personalizations: [
                {
                    to: [
                        {
                            email: 'Jimmy@abc.com'
                        }
                    ],
                    subject: 'Hello, from sendGrid!',
                    cc: [
                        {
                            email: 'fiftycents@gym.com'
                        }
                    ]
                }
            ],
            from: {
                email: 'mahtab@gmail.com'
            },
            content: [
                {
                    type: 'text/plain',
                    value: 'This is the email body'
                }
            ]
        });
    });

    it('createSendGridPayload() has 1 bcc', function () {
        var payload = {
            from: 'mahtab@gmail.com',
            to: 'Jimmy@abc.com',
            subject: 'Hello, from sendGrid!',
            text: 'This is the email body',
            bcc: 'tom@gym.com'
        }
        var actual = service.createSendGridPayload(payload);
        expect(actual).eql({
            personalizations: [
                {
                    to: [
                        {
                            email: 'Jimmy@abc.com'
                        }
                    ],
                    subject: 'Hello, from sendGrid!',
                    bcc: [
                        {
                            email: 'tom@gym.com'
                        }
                    ]
                }
            ],
            from: {
                email: 'mahtab@gmail.com'
            },
            content: [
                {
                    type: 'text/plain',
                    value: 'This is the email body'
                }
            ]
        });
    });

    it('createSendGridPayload() has all fields, multiple emails', function () {
        var payload = {
            from: 'mahtab@gmail.com',
            to: 'Jimmy@abc.com, jack@here.com',
            subject: 'Hello, from sendGrid!',
            text: 'This is the email body',
            cc: 'sara@dfg.com, casa@zzz.co, gh@yu.co',
            bcc: 'tom@gym.com, brat@go.go, smith@hashtag.com'
        }
        var actual = service.createSendGridPayload(payload);
        expect(actual).eql({
            personalizations: [
                {
                    to: [{
                        email: 'Jimmy@abc.com',
                    }, {
                        email: 'jack@here.com'
                    }
                    ],
                    subject: 'Hello, from sendGrid!',
                    cc: [{
                        email: 'sara@dfg.com'
                    }, {
                        email: 'casa@zzz.co'
                    }, {
                        email: 'gh@yu.co'
                    }
                    ],
                    bcc: [{
                        email: 'tom@gym.com',
                    }, {
                        email: 'brat@go.go'
                    }, {
                        email: 'smith@hashtag.com'
                    }]
                }
            ],
            from: {
                email: 'mahtab@gmail.com'
            },
            content: [
                {
                    type: 'text/plain',
                    value: 'This is the email body'
                }
            ]
        });
    });
});