import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Mail from 'nodemailer/lib/mailer';
dotenv.config();

type emailProps = {
  to: string;
  subject: string;
  text: string;
};

export function sendMail(mail: emailProps): Promise<Mail> {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  return transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    ...mail,
  });
}
