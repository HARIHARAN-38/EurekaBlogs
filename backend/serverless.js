// serverless.js - Vercel specific wrapper for our Express API
require('dotenv').config();
const app = require('./server');

// Export the Express API as the default module
module.exports = app;
