import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import { welcomeTemplate } from '../templates/emails/welcome.template';

export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }

    async sendCredentials(email: string, username: string, password: string): Promise<void> {
        const template = Handlebars.compile(welcomeTemplate.template);
        const html = template({ username, password });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: welcomeTemplate.subject,
            html
        };

        await this.transporter.sendMail(mailOptions);
    }
}