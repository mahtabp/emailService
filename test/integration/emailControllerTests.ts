import { app, init } from '../../api/app';
import * as superTest from 'supertest';
import { expect } from 'chai';

describe('emailController', function () {
    let isInitialized = false;
    this.beforeEach(async () => {
        if (!isInitialized) {
            await init();
            isInitialized = true;
        }
    });

    it('sendEmail() missing required parameters return error', async function () {
        const body = {
        };
        const response = await superTest(app)
            .post('/send')
            .send(body);

        expect(response.status).eql(400);
        expect(response.text).eql('{"code":9000,"description":"one of these required parameters is missing: from, to, subject and text"}');
    });

    it('sendEmail() invalid recepient email format return error', async function () {
        this.timeout(10000);
        const body = {
            from: 'sender@home.com',
            to: 'recipient home.com',
            subject: 'some subject',
            text: 'the content of the email'
        };
        const response = await superTest(app)
            .post('/send')
            .send(body);

        console.log('TEST: ' + JSON.stringify(response, null, 2));
        expect(response.status).eql(400);
        expect(response.text).eql('{"code":9001,"description":"Please review the recipient email format"}');
    });

    it('sendEmail() invalid sender email format return error', async function () {
        const body = {
            from: 'sender home.com',
            to: 'recipient@test.com',
            subject: 'some subject',
            text: 'the content of the email'
        };
        const response = await superTest(app)
            .post('/send')
            .send(body);

        expect(response.status).eql(400);
        expect(response.text).eql('{"code":9001,"description":"Please review the recipient email format"}');
    });

    it('sendEmail() successful through mailGun', async function () {
        this.timeout(10000);
        const body = {
            from: 'sender@test.com',
            to: 'recipient@test.com',
            subject: 'some subject',
            text: 'the content of the email'
        };
        const response = await superTest(app)
            .post('/send')
            .send(body);

        expect(response.status).eql(200);
        expect(response.text).eql('OK');
    });

    it('sendEmail() mailGun fails but sendGrid sends the email', async function () {
        this.timeout(10000);
        const body = {
            from: 'sender@test.com',
            to: 'recipient@test.com',
            subject: 'some subject',
            text: 'the content of the email',
            cc: 'abc @ *&*&test.com'
        };
        const response = await superTest(app)
            .post('/send')
            .send(body);

        expect(response.status).eql(200);
        expect(response.text).eql('OK');
    });

    it('status() return 200', async function () {
        const response = await superTest(app)
            .get('/')
            .send();

        expect(response.status).eql(200);
    });
})