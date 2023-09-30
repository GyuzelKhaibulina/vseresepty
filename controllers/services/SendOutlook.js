import nodemailer from 'nodemailer';
import { OUTLOOK_HOST, OUTLOOK_USER, OUTLOOK_PASSW, SMTP_PORT_TLS } from '../../const/const.js';

class SendOutlook {
    #transporter = null;
    constructor() {
        this.#transporter = this.#getTransporter();
    }

    #getTransporter () {
        return nodemailer.createTransport({
            host: OUTLOOK_HOST, 
            secureConnection: false, 
            port: SMTP_PORT_TLS,
            // logger: true,
            // debu: true,
            auth: {
                user: OUTLOOK_USER,
                pass: OUTLOOK_PASSW
            },
            tls: {
                ciphers:'SSLv3'
            }
        })
    }
    async send (reciever, message, subject, html) {
        try {
            const info = await this.#transporter.sendMail ({
                from: '"VsRecepti" <vsrecepti@outlook.com>',
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

export default new SendOutlook;
