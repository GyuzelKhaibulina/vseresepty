import nodemailer from 'nodemailer';
import { GMAIL_HOST, SMTP_PORT_SSL, GMAIL_USER, GMAIL_PASSW } from '../../const/const.js';

class SendGmail {
    #transporter = null;
    constructor() {
        this.#transporter = this.#getTransporter();
    }

    #getTransporter () {
        return nodemailer.createTransport({
            host: GMAIL_HOST,
            port: SMTP_PORT_SSL,
            secure: true,
            logger: true,
            debug: true,
            secureConnection: false,
            auth: {
                 user: GMAIL_USER,
                 pass: GMAIL_PASSW,  // this password must be generated from google account https://support.google.com/mail/answer/185833?hl=ru 
            },
            tls: {
                rejectUnauthorized: true
            }
        })
    }
    async send (reciever, message, subject, html) {
        try {
            const info = await this.#transporter.sendMail ({
                from: "ВсеРецепты",
                to: reciever,
                subject: subject,
                text: message,
                html: html,
            })
            return info.messageId
        }
        catch (e) {
            return e
        }
    }
}

export default new SendGmail;
