import express from 'express';
import cors from 'cors';
import { config } from './config/environment.js';
import articleRoutes from './routes/articleRoutes.js';
import { requestLogger, notFoundHandler, errorHandler } from './middleware/common.js';

/**
 * Initialize and configure Express application
 */
const app = express();

// Middleware
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api', articleRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`🚀 Server running on http://localhost:${config.port}`);
  console.log(`📡 API available at http://localhost:${config.port}/api/articles`);
});

export default app;
