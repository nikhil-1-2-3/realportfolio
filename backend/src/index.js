import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import healthRoutes from './routes/health.js';
import contactRoutes from './routes/contact.js';
import { errorHandler } from './middleware/errorHandler.js';
import { generalApiLimiter } from './middleware/rateLimiter.js';
import { initDatabase } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Trust reverse proxy (AWS ALB / NGINX) to capture true client IPs
app.set('trust proxy', 1);

// Security Middleware
app.use(helmet());

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  process.env.CORS_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (such as mobile apps, curl, or ALB health checks)
      if (!origin) return callback(null, true);

      // Check if origin matches allowed origin or any vercel.app preview domain
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /\.vercel\.app$/.test(origin) ||
        origin === process.env.FRONTEND_URL;

      if (isAllowed) {
        return callback(null, true);
      } else {
        console.warn(`[CORS Blocked] Origin: ${origin}`);
        return callback(new Error('Not allowed by CORS configuration.'));
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// General rate limiter & Body parser
app.use(generalApiLimiter);
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Mount API Routes
app.use('/api/health', healthRoutes);
app.use('/api/contact', contactRoutes);

// Root fallback
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'Nikhil Singh Portfolio REST API',
    version: '1.0.0',
    documentation: '/api/health',
  });
});

// 404 handler for unknown endpoints
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.path}`,
  });
});

// Centralized error handler
app.use(errorHandler);

// Initialize Database & Start Server
const startServer = async () => {
  // Test and initialize MySQL connection pool
  await initDatabase();

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[API Server] Portfolio backend active on http://0.0.0.0:${PORT}`);
    console.log(`[API Server] Health check available at http://localhost:${PORT}/api/health`);
    console.log(`[API Server] Environment: ${process.env.NODE_ENV || 'development'}`);
  });
};

startServer();

export default app;
