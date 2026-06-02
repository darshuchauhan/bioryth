import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || '');

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, email, phone, message } = req.body || {};

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    if (!process.env.RESEND_API_KEY) {
        return res.status(500).json({ error: 'Email service is not configured.' });
    }

    try {
        await resend.emails.send({
            from: 'info@bioryth.com',
            to: ['info@bioryth.com'],
            subject: `New website inquiry from ${name}`,
            html: `
                <h1>New Website Inquiry</h1>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br />')}</p>
            `,
        });

        return res.status(200).json({ message: 'Inquiry sent.' });
    } catch (error) {
        console.error('Resend email error:', error);
        return res.status(500).json({ error: 'Unable to send inquiry. Please try again later.' });
    }
}
