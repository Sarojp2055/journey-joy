const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const path = require('path');

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
}

// Import routes
const authRoutes = require('./routes/authRoutes');
const placesRoutes = require('./routes/placesRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for Vercel serverless environment
app.set('trust proxy', 1);

// 1. Security Headers
app.use(helmet({ contentSecurityPolicy: false }));

// 2. CORS Configuration
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL,
    'https://journey-joy.vercel.app'
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// 3. Body Parser
app.use(express.json({ limit: '10kb' }));

// 4. HPP Security (prevent HTTP Parameter Pollution)
app.use(hpp());

// 5. Rate Limiting
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: { error: 'Too many requests, please try again later' },
    // Disable X-Forwarded-For validation for Vercel serverless
    validate: { xForwardedForHeader: false }
});
app.use('/api', globalLimiter);

// 6. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/places', placesRoutes);
app.use('/api/me', userRoutes);

// 7. Health Check Endpoint
app.get('/api/health', async (req, res) => {
    try {
        const pool = require('./config/db');
        await pool.query('SELECT 1');
        res.json({
            status: 'healthy',
            database: 'connected',
            version: '1.0.0',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Health check failed:', error.message);
        res.status(500).json({
            status: 'degraded',
            database: 'disconnected',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// 8. 404 handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
});

// 9. Global Error Handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'production' ? undefined : err.message
    });
});

// 10. Start Server (local development only)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
    });
} else {
    console.log('🌐 Vercel Production Environment - Serverless mode active');
}

module.exports = app;
