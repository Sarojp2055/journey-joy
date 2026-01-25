const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');
const mysql = require('mysql2/promise');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const placesRoutes = require('./routes/placesRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Security Headers
app.use(helmet());

// 2. CORS - Allow Frontend to communicate
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    /\.vercel\.app$/ // Matches any Vercel deployment
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Body Parsers (with size limits to prevent Denial of Service)
app.use(express.json({ limit: '10kb' }));

// 4. Data Sanitization (XSS and Parameter Pollution)
app.use(xss());
app.use(hpp());

// 5. Rate Limiting
// Global API Limiter
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes.'
});
app.use('/api', globalLimiter);

// Auth Limiter (Much stricter to prevent Brute Force)
const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // 10 attempts per hour
    message: 'Too many failed login attempts. Account locked for 1 hour for security.'
});
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// 6. Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Kathmandu Heritage Trails API',
        status: 'active',
        health: '/api/health'
    });
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use('/api/auth', authRoutes);
app.use('/api/places', placesRoutes);
app.use('/api/me', userRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy', version: '1.0.0-secure' });
});

// 7. Professional Global Error Handler (Hides DB details)
app.use((err, req, res, next) => {
    console.error(' [SECURITY LOG] ERROR:', err.stack);

    const statusCode = err.statusCode || 500;
    const message = process.env.NODE_ENV === 'production'
        ? 'A server error occurred. Please contact support.'
        : err.message;

    res.status(statusCode).json({
        success: false,
        error: message
    });
});

// Create DB connection test on start
const pool = require('./config/db');
pool.getConnection()
    .then(conn => {
        console.log('✅ Connected to Database (Secure Layer Active)');
        conn.release();
    })
    .catch(err => {
        console.error('❌ Database Connection Error:', {
            message: err.message,
            code: err.code,
            errno: err.errno,
            sqlState: err.sqlState
        });
    });

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Secure Server running on port ${PORT}`);
    });
}

module.exports = app;
