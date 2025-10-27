const nodemailer = require('nodemailer');

// Simple helpers
function escapeHtml(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function nl2br(str = '') {
  return String(str).replace(/\r?\n/g, '<br/>');
}

exports.handler = async function (event) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: JSON.stringify({ status: 'error', message: 'Method Not Allowed' }) };
    }

    const body = event.body ? JSON.parse(event.body) : {};
    const { name, email, phone, subject, message } = body || {};

    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ status: 'error', message: 'Missing required fields: Name, Email, Subject and Message are required.' }),
      };
    }

    const GMAIL_USER = process.env.GMAIL_USER;
    const GMAIL_PASS = process.env.GMAIL_PASS;
    const RECEIVING_EMAIL = process.env.RECEIVING_EMAIL;
    const MAILER_DISABLED = String(process.env.MAILER_DISABLED || '').toLowerCase();

    const mockMailer = MAILER_DISABLED === '1' || MAILER_DISABLED === 'true';

    if (!mockMailer && (!GMAIL_USER || !GMAIL_PASS || !RECEIVING_EMAIL)) {
      return {
        statusCode: 500,
        body: JSON.stringify({ status: 'error', message: 'Email service not configured. Missing server environment variables.' }),
      };
    }

    // build email HTML bodies (simple versions)
    const adminHtml = `
      <h1>New Contact</h1>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || 'N/A')}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <h2>Message</h2>
      <p>${nl2br(escapeHtml(message))}</p>
    `;

    const userHtml = `
      <h1>Thanks ${escapeHtml(name)}</h1>
      <p>Thanks for contacting us about <strong>${escapeHtml(subject)}</strong>. We'll be in touch shortly.</p>
      <hr/>
      <p>Your message:</p>
      <blockquote>${nl2br(escapeHtml(message))}</blockquote>
    `;

    if (mockMailer) {
      console.log('[MAILER MOCK] Would send admin email to:', RECEIVING_EMAIL);
      console.log('[MAILER MOCK] Would send user email to:', email);
      return {
        statusCode: 200,
        body: JSON.stringify({ status: 'success', message: '(Mock) Email would be sent (MAILER_DISABLED).' }),
      };
    }

    // create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) === 465 : true,
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });

    // send admin notification
    await transporter.sendMail({
      from: `Portfolio Contact <${GMAIL_USER}>`,
      to: RECEIVING_EMAIL,
      replyTo: email,
      subject: `New contact — ${subject}`,
      html: adminHtml,
    });

    // send auto-reply to user
    await transporter.sendMail({
      from: `Sajjat Mujawar <${GMAIL_USER}>`,
      to: email,
      subject: `We received your message, ${name}`,
      html: userHtml,
    });

    return { statusCode: 200, body: JSON.stringify({ status: 'success', message: 'Email sent successfully!' }) };
  } catch (err) {
    console.error('Netlify function error:', err);
    return { statusCode: 500, body: JSON.stringify({ status: 'error', message: 'Failed to send email. Check server logs.' , error: String(err) }) };
  }
};
