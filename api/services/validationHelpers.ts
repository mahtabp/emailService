import { EmailPayload } from '../models/emailPayload';

export function validateRequestBody(emailPayload: EmailPayload): boolean {
    // TODO: Could use some npm packages like joi
    return (emailPayload.from !== undefined &&
        emailPayload.to !== undefined &&
        emailPayload.subject !== undefined &&
        emailPayload.text !== undefined)
}

export function areEmailAddressesValid(emailAddresses: string): boolean {
    var isValid = true;
    if (isEmpty(emailAddresses)) {
        return false;
    }
    var emailAddressArray: string[] = emailAddresses.split(',');
    emailAddressArray.forEach(emailAddress => {
        isValid = isValid && isEmailValid(emailAddress);
    });

    return isValid;
}

function isEmailValid(emailAddress: string): boolean {
    var isValid = true;
    if (isEmpty(emailAddress)) {
        return false;
    }

    emailAddress = emailAddress.trim();
    var emailsWithNames = emailAddress.split(/[<>]/);

    if (emailsWithNames.length > 1) {
        var emailSection = emailsWithNames[1];
        isValid = emailsWithNames.length === 3 && validateEmail(emailSection);
    } else {
        isValid = validateEmail(emailAddress);
    }

    return isValid;
}

// REF: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email): boolean {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

function isEmpty(text: string): boolean {
    return (text === undefined || text === null || text === '')
}