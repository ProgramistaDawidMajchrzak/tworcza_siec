const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendMail({ to, subject, html }) {
  if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY missing");
  if (!process.env.MAIL_FROM) throw new Error("MAIL_FROM missing");

  return resend.emails.send({
    from: process.env.MAIL_FROM,
    to,
    subject,
    html,
  });
}

module.exports = { sendMail };
