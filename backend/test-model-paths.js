require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing MongoDB models import paths...');

// Test importing from the models/mongodb path
console.log('\n1. Testing import from ./models/mongodb:');
try {
  const mongodbModels = require('./models/mongodb');
  console.log('✅ Successfully imported ./models/mongodb');
  console.log('Available exports:', Object.keys(mongodbModels));
} catch (error) {
  console.error('❌ Failed to import ./models/mongodb:', error.message);
}

// Test importing from the models path (symlinked)
console.log('\n2. Testing import from ./models:');
try {
  const models = require('./models');
  console.log('✅ Successfully imported ./models');
  console.log('Available exports:', Object.keys(models));
} catch (error) {
  console.error('❌ Failed to import ./models:', error.message);
}

// Test the User model from both paths
console.log('\n3. Testing User model consistency:');
try {
  const { User: User1 } = require('./models/mongodb');
  const { User: User2 } = require('./models');
  
  console.log('User model from mongodb path:', User1.modelName);
  console.log('User model from root path:', User2.modelName);
  
  if (User1 === User2) {
    console.log('✅ Both paths reference the same User model instance');
  } else {
    console.log('❌ Different User model instances');
  }
} catch (error) {
  console.error('❌ Error testing User model consistency:', error.message);
}

console.log('\nMongoDB models test complete!');
