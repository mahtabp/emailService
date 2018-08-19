export const ErrorCodes = {
    InvalidRequestParameters: {
        code: 9000,
        description: 'one of these required parameters is missing: from, to, subject and text'
    },
    InvalidEmail: {
        code: 9001,
        description: 'Please review the recipient email format'
    }
}
