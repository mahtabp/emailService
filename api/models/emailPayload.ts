export interface EmailPayload {
    from: string,
    to: string,
    subject: string,
    text: string,
    cc?: string,
    bcc?: string,
}

export function buildEmailPayload(requestBody: any): EmailPayload {
    return {
        from: requestBody.from,
        to: requestBody.to,
        subject: requestBody.subject,
        text: requestBody.text,
        cc: requestBody.cc,
        bcc: requestBody.bcc
    }
}