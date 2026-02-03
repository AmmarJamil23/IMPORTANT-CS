import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import database from './config/database.js';  // ADD THIS

dotenv.config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check with database status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'DistributeX MapReduce Server',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    database: database.getStatus()  // ADD THIS
  });
});

io.on('connection', (socket) => {
  console.log(` Client connected: ${socket.id}`);
  
  socket.on('disconnect', () => {
    console.log(` Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

// Initialize database before starting server
async function startServer() {
  try {
    // Connect to database
    await database.connect();
    
    // Start HTTP server
    httpServer.listen(PORT, HOST, () => {
      console.log(`
╔════════════════════════════════════════════════════════╗
║                                                        ║
║      DistributeX MapReduce Server                   ║
║                                                        ║
║     Status:      RUNNING                              ║
║     Environment: ${process.env.NODE_ENV?.toUpperCase().padEnd(39)}║
║     Host:        ${HOST.padEnd(39)}║
║     Port:        ${PORT.toString().padEnd(39)}║
║     Database:    ${database.getStatus().toUpperCase().padEnd(39)}║
║                                                        ║
║     URL:         http://${HOST}:${PORT.toString().padEnd(26)}║
║     Health:      http://${HOST}:${PORT}/api/health${' '.repeat(13)}║
║                                                        ║
╚════════════════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  await database.disconnect();
  httpServer.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Start the server
startServer();

export default app;