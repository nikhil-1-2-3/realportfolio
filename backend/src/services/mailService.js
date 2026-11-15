import nodemailer from 'nodemailer';

/**
 * Configure Nodemailer transport using environment variables
 */
const createTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
};

/**
 * Send contact email notification to Nikhil
 */
export const sendContactNotification = async ({ name, email, subject, message, ip }) => {
  const recipient = process.env.RECIPIENT_EMAIL || '23amtics402@gmail.com';
  const transporter = createTransporter();

  if (!transporter) {
    console.warn(
      `[MailService] SMTP credentials not fully configured in environment. Message from ${name} (<${email}>) recorded in local audit log.`
    );
    return {
      sent: false,
      reason: 'SMTP_UNCONFIGURED_FALLBACK_RECORDED',
    };
  }

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0d1322; color: #f8fafc; border-radius: 12px; border: 1px solid #1e293b;">
      <div style="border-bottom: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 20px;">
        <h2 style="margin: 0; color: #10b981; font-size: 20px;">New Message from Portfolio Website</h2>
        <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 13px;">Received via EC2 Contact API</p>
      </div>

      <div style="margin-bottom: 16px;">
        <strong style="color: #94a3b8; font-size: 12px; text-transform: uppercase;">Sender Name:</strong>
        <div style="font-size: 15px; color: #f8fafc; margin-top: 2px;">${escapeHtml(name)}</div>
      </div>

      <div style="margin-bottom: 16px;">
        <strong style="color: #94a3b8; font-size: 12px; text-transform: uppercase;">Sender Email:</strong>
        <div style="font-size: 15px; color: #f8fafc; margin-top: 2px;">
          <a href="mailto:${escapeHtml(email)}" style="color: #06b6d4; text-decoration: none;">${escapeHtml(email)}</a>
        </div>
      </div>

      <div style="margin-bottom: 16px;">
        <strong style="color: #94a3b8; font-size: 12px; text-transform: uppercase;">Subject:</strong>
        <div style="font-size: 15px; color: #f8fafc; margin-top: 2px;">${escapeHtml(subject)}</div>
      </div>

      <div style="margin-bottom: 24px; padding: 16px; background-color: #161f36; border-radius: 8px; border: 1px solid #1e293b;">
        <strong style="color: #94a3b8; font-size: 12px; text-transform: uppercase; display: block; margin-bottom: 8px;">Message Content:</strong>
        <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>

      <div style="font-size: 11px; color: #64748b; border-top: 1px solid #1e293b; padding-top: 12px;">
        Sender IP: ${ip} • Submitted at ${new Date().toISOString()}
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Portfolio Contact Form" <${process.env.SMTP_FROM || user}>`,
    to: recipient,
    replyTo: email,
    subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
    text: `New contact form submission\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    html: htmlContent,
  });

  return {
    sent: true,
  };
};

function escapeHtml(string) {
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

