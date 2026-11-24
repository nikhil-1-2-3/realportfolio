import rateLimit from 'express-rate-limit';

/**
 * Helper to extract true client IP behind reverse proxies (Vercel, AWS ALB, NGINX)
 */
export const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded && typeof forwarded === 'string') {
    // In multi-proxy setups (Vercel -> AWS ALB -> EC2), X-Forwarded-For is:
    // client_ip, vercel_ip, alb_ip
    const clientIp = forwarded.split(',')[0].trim();
    if (clientIp) return clientIp;
  }
  return req.ip || req.socket?.remoteAddress || '127.0.0.1';
};

/**
 * Contact Form Rate Limiter
 * Allows legitimate inquiries and portfolio testing while preventing aggressive spam
 */
export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 60, // Limit each client IP to 60 contact requests per 15 minutes
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  keyGenerator: (req) => getClientIp(req),
  validate: {
    trustProxy: false,
    xForwardedForHeader: false,
  },
  message: {
    success: false,
    message: 'Too many messages sent from this connection. Please wait a few minutes before trying again.',
  },
});

/**
 * General API Rate Limiter
 */
export const generalApiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 120, // 120 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => getClientIp(req),
  validate: {
    trustProxy: false,
    xForwardedForHeader: false,
  },
  message: {
    success: false,
    message: 'Too many requests. Please slow down.',
  },
});


