const Contact = require('../models/Contact');
const createTransporter = require('../config/mailer');

async function submitContactForm(req, res) {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please fill name, email, and message.',
    });
  }

  try {
    await Contact.create({ name, email, message });

    const transporter = createTransporter();
    if (!transporter) {
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured yet.',
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL || process.env.MAIL_USER;

    const adminEmailPromise = transporter.sendMail({
      from: process.env.MAIL_USER,
      to: adminEmail,
      subject: `New Portfolio Contact from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    const autoReplyPromise = transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Thanks for contacting me!',
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for reaching out through my portfolio website.</p>
        <p>I received your message and will reply soon.</p>
        <br />
        <p>Best regards,</p>
        <p>Tushal Jadhav</p>
      `,
    });

    await Promise.all([adminEmailPromise, autoReplyPromise]);

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully.',
    });
  } catch (error) {
    console.error('Contact form error:', error.message);

    const mailAuthFailed =
      error.message &&
      error.message.toLowerCase().includes('application-specific password required');

    if (mailAuthFailed) {
      return res.status(500).json({
        success: false,
        message: 'Gmail App Password required. Please update MAIL_PASS in .env with a valid 16-character App Password.',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Something went wrong while sending your message.',
    });
  }
}

module.exports = {
  submitContactForm,
};
