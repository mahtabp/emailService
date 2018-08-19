import * as validation from '../../api/services/validationHelpers';
import { expect } from 'chai';

describe('validationHelpers', function () {

    it('areEmailAddressesValid() valid email', function () {
        const email = 'me@test.com';

        var result = validation.areEmailAddressesValid(email);
        expect(result).equal(true);
    });

    it('areEmailAddressesValid() valid emails', function () {
        const email = 'me@test.com, you@here.io,us@abc.org';

        var result = validation.areEmailAddressesValid(email);
        expect(result).equal(true);
    });

    it('areEmailAddressesValid() valid emails with name tags', function () {
        const email = 'me <me@test.com>, you<you@test.com>';

        var result = validation.areEmailAddressesValid(email);
        expect(result).equal(true);
    });

    it('areEmailAddressesValid() invalid email missing closing tag', function () {
        const email = 'me <me@test.com';

        var result = validation.areEmailAddressesValid(email);
        expect(result).equal(false);
    });

    it('areEmailAddressesValid() invalid email missing openiing tag', function () {
        const email = 'me@test.com>';

        var result = validation.areEmailAddressesValid(email);
        expect(result).equal(false);
    });

    it('areEmailAddressesValid() multiple emails with names one with missing tags', function () {
        const email = 'me <me@test.com>, you<you@test.com>, we<we@test';

        var result = validation.areEmailAddressesValid(email);
        expect(result).equal(false);
    });

    it('areEmailAddressesValid() multiple emails with and without names tags', function () {
        const email = 'me@test.com, you<you@test.com>, we<we@test.com>';

        var result = validation.areEmailAddressesValid(email);
        expect(result).equal(true);
    });

    it('areEmailAddressesValid() 1 invalid email in a list', function () {
        const email = 'thisiswrong, mahtab@home.com';

        var result = validation.areEmailAddressesValid(email);
        expect(result).equal(false);
    });

    it('areEmailAddressesValid() extra , in email list', function () {
        const email = 'me@test.com, mahtab@home.com,  ';

        var result = validation.areEmailAddressesValid(email);
        expect(result).equal(false);
    });

    it('areEmailAddressesValid() email is null', function () {
        var result = validation.areEmailAddressesValid(null);
        expect(result).equal(false);
    });

    it('areEmailAddressesValid() email is undefined', function () {
        var result = validation.areEmailAddressesValid(undefined);
        expect(result).equal(false);
    });

    it('areEmailAddressesValid() email is empty', function () {
        var result = validation.areEmailAddressesValid('');
        expect(result).equal(false);
    });
});