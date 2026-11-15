/**
 * Centralized error handling middleware
 */
export const errorHandler = (err, req, res, next) => {
  console.error('[API Error]:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
  });

  const statusCode = err.status || err.statusCode || 500;
  const clientMessage =
    statusCode === 500 && process.env.NODE_ENV === 'production'
      ? 'An unexpected internal server error occurred. Please try again later.'
      : err.message || 'Something went wrong.';

  res.status(statusCode).json({
    success: false,
    message: clientMessage,
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};

