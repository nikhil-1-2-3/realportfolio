import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let pool = null;
let isConnected = false;

/**
 * Get or initialize MySQL connection pool
 */
export const getPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Singh5322f',
      database: process.env.DB_NAME || 'portfolio_db',
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
    });
  }
  return pool;
};

/**
 * Initialize MySQL database and ensure contacts table exists
 */
export const initDatabase = async () => {
  try {
    const currentPool = getPool();
    const connection = await currentPool.getConnection();
    
    // Auto-create contacts table if it does not exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL,
        subject VARCHAR(200) NOT NULL,
        message TEXT NOT NULL,
        ip_address VARCHAR(45) DEFAULT NULL,
        mail_status VARCHAR(50) DEFAULT 'received',
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_created_at (created_at),
        INDEX idx_mail_status (mail_status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    connection.release();
    isConnected = true;
    console.log(`[Database] MySQL connected successfully to ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '3306'}/${process.env.DB_NAME || 'portfolio_db'}`);
    return true;
  } catch (error) {
    isConnected = false;
    console.warn(`[Database Warning] MySQL connection failed (${error.code || error.message}). Contact form submissions will be preserved in local audit log.`);
    return false;
  }
};

/**
 * Save contact submission into MySQL database
 */
export const saveContactToDb = async ({ name, email, subject, message, ip, mailStatus }) => {
  try {
    const currentPool = getPool();
    const [result] = await currentPool.execute(
      `INSERT INTO contacts (name, email, subject, message, ip_address, mail_status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, subject, message, ip || null, mailStatus || 'received']
    );

    return {
      success: true,
      insertId: result.insertId,
    };
  } catch (error) {
    console.error('[Database Error] Failed to insert contact into MySQL:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Retrieve total contact count from MySQL
 */
export const getContactsCount = async () => {
  try {
    const currentPool = getPool();
    const [rows] = await currentPool.query('SELECT COUNT(*) as count FROM contacts');
    return rows[0]?.count || 0;
  } catch {
    return 0;
  }
};

/**
 * Check database health
 */
export const checkDbHealth = async () => {
  try {
    const start = Date.now();
    const currentPool = getPool();
    await currentPool.query('SELECT 1');
    const latency = Date.now() - start;
    return {
      status: 'connected',
      latencyMs: latency,
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'portfolio_db',
    };
  } catch (error) {
    return {
      status: 'disconnected',
      error: error.message,
      host: process.env.DB_HOST || 'localhost',
    };
  }
};
