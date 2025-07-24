// src/server.js
const express = require('express');
const mongoose = require('mongoose');
const promotionRoutes = require('./routes/promotion');
const { loadRulesFromFile } = require('./services/ruleEngine');
const { register } = require('./utils/metrics');
require('dotenv').config();

loadRulesFromFile();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/promotion', promotionRoutes);

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// ✅ Connect to MongoDB only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI || '')
    .then(() => {
      console.log('✅ MongoDB connected');

      // Start server
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    })
    .catch(err => {
      console.log('❌ MongoDB connection failed:', err.message);
    });
}

module.exports = app;
