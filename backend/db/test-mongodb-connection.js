require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB } = require('../models/mongodb');

// Get the MongoDB URI from environment variables
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/eureka_blogs';

async function testConnection() {
  console.log('Attempting to connect to MongoDB...');
  console.log(`Connection string: ${uri.replace(/:[^:]*@/, ':****@')}`); // Hide password
  
  try {
    // First test using direct Mongoose connection
    console.log('\n1. Testing direct Mongoose connection...');
    try {
      await mongoose.connect(uri, {
        autoIndex: true,
      });
      console.log('✓ Direct MongoDB connection established successfully!');
      
      // List all collections
      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log('Available collections:');
      collections.forEach(collection => {
        console.log(` - ${collection.name}`);
      });
      
      // Close the connection
      await mongoose.connection.close();
      console.log('Direct connection closed.');
    } catch (error) {
      console.error('✗ Direct MongoDB connection error:', error.message);
    }

    // Second test using the application's connectDB function
    console.log('\n2. Testing application connectDB function...');
    try {
      await connectDB();
      console.log('✓ Application MongoDB connection established successfully!');
      
      // List all collections using the app's mongoose connection
      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log('Available collections:');
      collections.forEach(collection => {
        console.log(` - ${collection.name}`);
      });
      
      // Close the connection
      await mongoose.connection.close();
      console.log('Application connection closed.');
    } catch (error) {
      console.error('✗ Application MongoDB connection error:', error.message);
    }
  } catch (error) {
    console.error('General error during connection tests:', error);
  }
}

testConnection();
