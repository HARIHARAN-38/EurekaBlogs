require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { connectDB } = require('./models/mongodb');

// Import routes
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');

// Initialize mongoose connection only once
let cachedDb = null;
async function initializeDb() {
  if (cachedDb) {
    console.log('Using existing database connection');
    return cachedDb;
  }
  
  console.log('Creating new database connection');
  await connectDB();
  cachedDb = true;
  return cachedDb;
}

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (will be called on each request in serverless environment)
initializeDb()
  .then(() => {
    console.log('MongoDB connection initialized');
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err.message);
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  });

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://eureka-blogs.vercel.app', process.env.FRONTEND_URL || 'https://eureka-blogs.vercel.app'] 
    : 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is healthy',
    database: {
      type: 'MongoDB',
      status: dbStatus
    }
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to Eureka Blogs API - MongoDB Edition');
});

// For Vercel serverless functions, we don't need to listen on a port
// But we still want to listen when running locally
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL_ENV === undefined) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥');
  console.log(err.name, err.message);
  // Don't exit the process in production as it could cause Vercel issues
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1);
  }
});

// Export the Express app
module.exports = app;
