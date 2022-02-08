import nodemailer from 'nodemailer';
import tamplates from './tamplates';

const {
  NODEMAILER_HOST, NODEMAILER_PORT, NODEMAILER_USER, NODEMAILER_PASS,
} = process.env;

const transporter = nodemailer.createTransport({
  host: NODEMAILER_HOST,
  port: NODEMAILER_PORT,
  // secure: true,
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const SendMail = (tamplate, { ...params }, subject, to) => {
  const html = tamplates[tamplate](params);
  transporter.sendMail({
    from: '"SeeMenu" <see.menu@yandex.com>',
    to,
    subject,
    text: html,
    html,
  });
};

export default SendMail;
