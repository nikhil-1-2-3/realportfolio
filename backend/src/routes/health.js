import { Router } from 'express';
import os from 'os';
import { getSubmissionsCount } from '../services/auditService.js';

const router = Router();
const startTime = Date.now();

/**
 * Health Check Endpoint
 * Used by AWS ALB target groups, Docker healthchecks, and uptime monitors
 */
router.get('/', async (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  const memoryUsage = process.memoryUsage();
  const messagesLogged = await getSubmissionsCount();

  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: `${uptimeSeconds}s`,
    environment: process.env.NODE_ENV || 'production',
    system: {
      hostname: os.hostname(),
      platform: os.platform(),
      nodeVersion: process.version,
    },
    memory: {
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
    },
    audit: {
      messagesLogged,
    },
  });
});

export default router;
