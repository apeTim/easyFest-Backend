import nodemailer from 'nodemailer';
import { DOMAIN, MAILER_ADDRESS, MAILER_HOST, MAILER_NAME, MAILER_PASS, MAILER_PORT, MAILER_USER } from '../config/config';

export default (() => {
    const mailer = nodemailer.createTransport({
        host: MAILER_HOST,
        port: MAILER_PORT,
        secure: true,
        auth: {
            user: MAILER_USER,
            pass: MAILER_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        }
    });

    return {
        sendActivateMessage: (email: string, link: string) => {
            return mailer.sendMail({ 
                encoding: 'utf-8',
                from: { 
                    name: MAILER_NAME, 
                    address: MAILER_ADDRESS 
                },
                to: email,
                text: `На ваш E-Mail зарегистрован аккаунт на сайте ${DOMAIN}\nПерейдите по ссылке ${link}, чтобы завершить регистрацию, либо проигнорируйте это письмо!`,
                html: `
                    <h1>Завершение регистрации на ${DOMAIN}</h1>
                    <h3>На ваш E-Mail зарегистрован аккаунт на сайте ${DOMAIN}</h3>
                    <h6>Перейдите по ссылке (<a href="${link}">*Жмак*</a>), чтобы завершить регистрацию, либо проигнорируйте это письмо!</h6>
                `
            });
        },
        sendMail: mailer.sendMail
    }
})();