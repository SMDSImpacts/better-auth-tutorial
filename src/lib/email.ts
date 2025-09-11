import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEnailVals {
    to: string;
    subject: string;
    text: string;
}

export async function sendEmail({ to, subject, text }: SendEnailVals) {
    await resend.emails.send({
        from: 'engrsamchukwuemeka@gmail.com',
        to,
        subject,
        text,
    });
}
    
