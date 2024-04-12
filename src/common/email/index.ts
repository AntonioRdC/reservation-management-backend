import { createTransport } from 'nodemailer';

const transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendConfirmationEmail(userEmail: string, token: string) {
  const url = `${process.env.API_URL}/auth/verification-token?token=${token}"`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Confirme seu endereço de e-mail',
    html: `<p>Clique <a href="${url}">aqui</a> para confirmar seu E-mail.</p>`,
  };

  await transporter.sendMail(mailOptions);
}
