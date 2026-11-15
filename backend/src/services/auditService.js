import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logDir = path.resolve(__dirname, '../../data');
const logFile = path.join(logDir, 'contact_messages.jsonl');

// Ensure data directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

/**
 * Persist contact submission to an audit log file
 * Guarantees zero message loss even if SMTP is offline
 */
export const recordSubmission = async (data) => {
  const record = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    timestamp: new Date().toISOString(),
    ip: data.ip || 'anonymous',
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    status: data.mailStatus || 'received',
  };

  const line = JSON.stringify(record) + '\n';
  await fs.promises.appendFile(logFile, line, 'utf8');
  return record;
};

/**
 * Read logged contact submissions
 */
export const getSubmissionsCount = async () => {
  try {
    if (!fs.existsSync(logFile)) return 0;
    const content = await fs.promises.readFile(logFile, 'utf8');
    return content.trim().split('\n').filter(Boolean).length;
  } catch {
    return 0;
  }
};

