import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database.js';
import studentRoutes from './routes/students.js';
import guardianRoutes from './routes/guardians.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'Nice Kids Center API'
  });
});

// API routes
app.get('/api', (req, res) => {
  res.json({
    message: 'Nice Kids Center - Business Rules API',
    version: '1.0.0',
    endpoints: {
      students: {
        'GET /api/students/:id/study-time': 'Calculate student study time',
        'GET /api/students/:id/age': 'Calculate student age',
        'GET /api/students/:id/birthday-countdown': 'Days until next birthday',
        'GET /api/students/:id/guardians': 'Get student guardians'
      },
      guardians: {
        'GET /api/guardians/:id/students': 'Get guardian students'
      }
    }
  });
});

app.use('/api/students', studentRoutes);
app.use('/api/guardians', guardianRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not found',
    path: req.path 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// Start server
async function startServer() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await connectDatabase();
    
    // Start listening
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on port ${PORT}`);
      console.log(`📍 Local: http://localhost:${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
      console.log(`💚 Health check: http://localhost:${PORT}/health\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
