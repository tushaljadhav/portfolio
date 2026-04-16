const nodemailer = require('nodemailer');

function createTransporter() {
  const mailUser = process.env.MAIL_USER;
  const mailPass = process.env.MAIL_PASS;

  if (!mailUser || !mailPass) {
    console.warn('MAIL_USER or MAIL_PASS is missing. Contact email feature will not work until configured.');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: mailUser,
      pass: mailPass,
    },
  });
}

module.exports = createTransporter;
