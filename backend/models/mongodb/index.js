const mongoose = require('mongoose');

const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/eureka_blogs';
    await mongoose.connect(uri, {
      autoIndex: true, // Build indexes
    });
    console.log('MongoDB connection established successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  User,
  Blog,
  Comment
};
