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

  // Basic validation
  const nameTrim = name.trim();
  const emailTrim = email.trim().toLowerCase();
  const messageTrim = message.trim();

  if (nameTrim.length < 2) {
    return res.status(400).json({ success: false, message: 'Name must be at least 2 characters.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailTrim)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
  }
  if (messageTrim.length < 10) {
    return res.status(400).json({ success: false, message: 'Message must be at least 10 characters.' });
  }

  try {
    await Contact.create({ name: nameTrim, email: emailTrim, message: messageTrim });

    const transporter = createTransporter();
    if (!transporter) {
      console.warn('Email service not configured - skipping email send but message saved');
      return res.status(200).json({
        success: true,
        message: 'Message saved successfully but email notifications could not be sent.',
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL || process.env.MAIL_USER || 'tushaljadhav123@gmail.com';

    const adminEmailPromise = transporter.sendMail({
      from: process.env.SENDER_EMAIL || 'tushalcollege@gmail.com',
      to: adminEmail,
      subject: `New Portfolio Contact from ${nameTrim}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${nameTrim}</p>
        <p><strong>Email:</strong> ${emailTrim}</p>
        <p><strong>Message:</strong> ${messageTrim}</p>
      `,
    });

    const autoReplyPromise = transporter.sendMail({
      from: process.env.SENDER_EMAIL || 'tushalcollege@gmail.com',
      to: emailTrim,
      subject: 'Thanks for contacting me!',
      html: `
        <h2>Hello ${nameTrim},</h2>
        <p>Thank you for reaching out through my portfolio website.</p>
        <p>I received your message and will reply soon.</p>
        <br />
        <p>Best regards,</p>
        <p>Tushal Jadhav</p>
      `,
    });

    // Send emails in the background so the user doesn't face any loading delay
    Promise.all([adminEmailPromise, autoReplyPromise])
      .then(() => console.log('Contact and auto-reply emails sent successfully.'))
      .catch((emailError) => console.error('Background email send error:', emailError.message));

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully.',
    });
  } catch (error) {
    console.error('Contact form error:', error.message, error.stack);

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
      message: 'Contact save failed. Check server logs. Error: ' + error.message,
    });
  }
}

// Admin-only controllers
async function getContacts(req, res) {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to fetch contact messages.' });
  }
}

async function deleteContact(req, res) {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Message not found.' });
    }
    return res.status(200).json({ success: true, message: 'Message deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to delete message: ' + error.message });
  }
}

async function clearAllContacts(req, res) {
  try {
    await Contact.deleteMany({});
    return res.status(200).json({ success: true, message: 'All messages cleared successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to clear messages: ' + error.message });
  }
}

module.exports = {
  submitContactForm,
  getContacts,
  deleteContact,
  clearAllContacts,
};
