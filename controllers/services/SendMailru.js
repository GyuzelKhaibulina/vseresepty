import nodemailer from 'nodemailer';
import { SMTP_PORT_SSL, MAIL_MAILRU_HOST, MAILRU_USER, MAILRU_PASSW } from '../../const/const.js';

class SendMailru {
    #transporter = null;
    constructor() {
        this.#transporter = this.#getTransporter();
    }

    #getTransporter () {
        return nodemailer.createTransport({
            // service: GMAIL_SERVICE,
            host: MAIL_MAILRU_HOST,
            port: SMTP_PORT_SSL,
            secure: true,
            logger: true,
            debug: true,
            secureConnection: false,
            auth: {
                 user: MAILRU_USER,
                 pass: MAILRU_PASSW,  
            },
            tls: {
                 rejectUnauthorized: false
            }
        })
    }
    async send (reciever, message, subject, html) {
        try {
            const info = await this.#transporter.sendMail ({
                from: '"VsRecepti" <vsrecepti@mail.ru>',
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

export default new SendMailru;
