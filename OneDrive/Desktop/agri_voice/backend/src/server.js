const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const aiRoutes = require('./routes/aiRoutes');
const dataRoutes = require('./routes/dataRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
const path = require('path');

// Serve public assets (uploads, static files)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Connect to database
connectDB();

// Basic health check route
app.get('/', (req, res) => {
  res.json({
    message: 'Krishi Mitra backend is running',
    status: 'ok',
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api', dataRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
