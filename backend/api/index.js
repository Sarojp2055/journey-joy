/**
 * Vercel Serverless Function Entry Point
 * This file wraps our Express app for Vercel's serverless environment
 */

const app = require('../src/server.js');

// Export the Express app as a Vercel serverless function
module.exports = app;
