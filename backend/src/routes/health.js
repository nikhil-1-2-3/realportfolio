import { Router } from 'express';
import os from 'os';
import { getSubmissionsCount } from '../services/auditService.js';
import { checkDbHealth, getContactsCount } from '../config/db.js';

const router = Router();
const startTime = Date.now();

/**
 * Health Check Endpoint
 * Used by AWS ALB target groups, Docker healthchecks, and uptime monitors
 */
router.get('/', async (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  const memoryUsage = process.memoryUsage();
  const fileLogCount = await getSubmissionsCount();
  const dbHealth = await checkDbHealth();
  const dbContactCount = await getContactsCount();

  const isHealthy = dbHealth.status === 'connected';

  res.status(200).json({
    status: isHealthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: `${uptimeSeconds}s`,
    environment: process.env.NODE_ENV || 'production',
    system: {
      hostname: os.hostname(),
      platform: os.platform(),
      nodeVersion: process.version,
    },
    database: {
      engine: 'MySQL 8 (Docker)',
      ...dbHealth,
      totalContactsInDb: dbContactCount,
    },
    memory: {
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
    },
    audit: {
      fileLogBackupCount: fileLogCount,
    },
  });
});

export default router;
