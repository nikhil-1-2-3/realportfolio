import { Router } from 'express';
import { contactRateLimiter, getClientIp } from '../middleware/rateLimiter.js';
import { sendContactNotification } from '../services/mailService.js';
import { recordSubmission } from '../services/auditService.js';
import { saveContactToDb } from '../config/db.js';

const router = Router();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Handle Contact Form Submission
 */
router.post('/', contactRateLimiter, async (req, res, next) => {
  try {
    const { name, email, subject, message, honeypot } = req.body;

    // 1. Silent rejection for automated spambots filling honeypot
    if (honeypot) {
      console.warn('[Contact] Honeypot triggered from IP:', req.ip);
      return res.status(200).json({
        success: true,
        message: 'Your message has been sent successfully.',
      });
    }

    // 2. Input validation
    const errors = [];

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long.');
    } else if (name.trim().length > 100) {
      errors.push('Name must not exceed 100 characters.');
    }

    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      errors.push('A valid email address is required.');
    } else if (email.trim().length > 150) {
      errors.push('Email address is too long.');
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length < 2) {
      errors.push('Subject must be at least 2 characters long.');
    } else if (subject.trim().length > 200) {
      errors.push('Subject must not exceed 200 characters.');
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      errors.push('Message must be at least 10 characters long.');
    } else if (message.trim().length > 5000) {
      errors.push('Message must not exceed 5000 characters.');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed.',
        errors,
      });
    }

    const sanitizedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      ip: getClientIp(req),
    };

    // 3. Dispatch email notification (if SMTP is configured)
    let mailStatus = 'sent';
    try {
      const mailResult = await sendContactNotification(sanitizedData);
      if (!mailResult.sent) {
        mailStatus = 'fallback_logged';
      }
    } catch (mailError) {
      console.error('[Mail Error]:', mailError.message);
      mailStatus = 'failed_but_logged';
    }

    // 4. Persist to Docker MySQL Database
    const dbResult = await saveContactToDb({
      ...sanitizedData,
      mailStatus,
    });

    // 5. Record to persistent audit log as zero-loss fallback
    try {
      await recordSubmission({
        ...sanitizedData,
        mailStatus,
        dbStatus: dbResult.success ? `mysql_id_${dbResult.insertId}` : 'mysql_failed',
      });
    } catch (auditError) {
      console.warn('[Audit Log Warning]:', auditError.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been received and will be reviewed shortly.',
      id: dbResult.insertId || undefined,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
