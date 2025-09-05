require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB } = require('./models/mongodb');
const { User, Blog, Comment } = require('./models');

console.log('MongoDB Test Script');
console.log('===================\n');

async function runTests() {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('✅ MongoDB connected successfully\n');

    console.log('Checking models:');
    console.log('- User model:', User.modelName);
    console.log('- Blog model:', Blog.modelName);
    console.log('- Comment model:', Comment.modelName);
    console.log('✅ All models loaded correctly\n');

    // Check connection status using mongoose
    const status = ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState];
    console.log('Connection status:', status);
    
    // Count documents in collections
    const userCount = await User.countDocuments();
    const blogCount = await Blog.countDocuments();
    const commentCount = await Comment.countDocuments();
    
    console.log('\nDatabase contents:');
    console.log('- Users:', userCount);
    console.log('- Blogs:', blogCount);
    console.log('- Comments:', commentCount);
    
    console.log('\n✅ MongoDB setup is complete and working correctly!');
    
    // Close connection
    await mongoose.connection.close();
    console.log('Connection closed.');
    
  } catch (error) {
    console.error('❌ Error during tests:', error.message);
    process.exit(1);
  }
}

runTests();
