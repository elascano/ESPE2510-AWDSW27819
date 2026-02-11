/**
 * Middleware to log incoming requests
 */
export const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
};

/**
 * Middleware to handle 404 errors
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: 'Route not found',
      path: req.path
    }
  });
};

/**
 * Global error handler middleware
 */
export const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Error:', err);
  
  res.status(500).json({
    success: false,
    error: {
      message: 'Internal server error',
      timestamp: new Date().toISOString()
    }
  });
};
