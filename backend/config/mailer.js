const nodemailer = require('nodemailer');

function createTransporter() {
  const mailUser = process.env.MAIL_USER;
  const mailPass = process.env.MAIL_PASS;

  if (!mailUser || !mailPass) {
    console.warn('MAIL_USER or MAIL_PASS is missing. Contact email feature will not work until configured.');
    return null;
  }

  // Configured to use Brevo SMTP relay by default
  return nodemailer.createTransport({
    host: process.env.MAIL_HOST || 'smtp-relay.brevo.com',
    port: parseInt(process.env.MAIL_PORT) || 587,
    secure: false, // true for 465, false for 587
    auth: {
      user: mailUser,
      pass: mailPass,
    },
  });
}

module.exports = createTransporter;
