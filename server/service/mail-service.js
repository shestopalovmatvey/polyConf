const nodemailer = require('nodemailer')

class MailService {
    
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }

        })
    }

    async sendMail(to, link) {
        await this.transporter.sendMail({
            from: {
                name: 'PolyConf',
                address: process.env.SMTP_USER
            },
            to,
            subject: "Восстановление пароля для аккаунта: " + to,
            text: '',
            html: 
                `
                    <div>
                        <h2>Для смены пароля перейдите по ссылке:</h2>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })

    }
}

module.exports = new MailService()