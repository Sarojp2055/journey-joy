const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Please provide all fields' });
    }

    try {
        const connection = await pool.getConnection();

        // Check if user exists
        const [existingUsers] = await connection.query(
            'SELECT * FROM users WHERE email = ? OR username = ?',
            [email, username]
        );

        if (existingUsers.length > 0) {
            connection.release();
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create user
        const [result] = await connection.query(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, passwordHash]
        );

        connection.release();

        sendTokenResponse(result.insertId, 201, res);
    } catch (error) {
        next(error);
    }
};

// Login User
exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide an email and password' });
    }

    try {
        const connection = await pool.getConnection();

        // Check for user
        const [users] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            connection.release();
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password_hash);

        connection.release();

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        sendTokenResponse(user.id, 200, res);
    } catch (error) {
        next(error);
    }
};

// Get Current User
exports.getMe = async (req, res, next) => {
    try {
        const connection = await pool.getConnection();
        const [users] = await connection.query('SELECT id, username, email, created_at FROM users WHERE id = ?', [req.user.id]);
        connection.release();

        res.status(200).json({
            success: true,
            data: users[0]
        });
    } catch (error) {
        next(error);
    }
};

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (userId, statusCode, res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res.status(statusCode).json({
        success: true,
        token
    });
};

// Forgot Password - Generate reset token
exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Please provide an email' });
    }

    try {
        const connection = await pool.getConnection();
        const [users] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            connection.release();
            // Don't reveal if user exists or not for security
            return res.status(200).json({
                success: true,
                message: 'If an account exists with this email, a reset link will be sent.'
            });
        }

        // Generate reset token
        const crypto = require('crypto');
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour

        // Hash the token before storing
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        await connection.query(
            'UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?',
            [hashedToken, resetTokenExpires, users[0].id]
        );

        connection.release();

        // In production, you would send an email here
        // For now, we'll return the token (only for testing - remove in production!)
        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

        // TODO: Implement email sending with nodemailer
        console.log('Password reset link (dev only):', resetUrl);

        res.status(200).json({
            success: true,
            message: 'If an account exists with this email, a reset link will be sent.',
            // Remove this in production - only for testing
            devResetUrl: process.env.NODE_ENV !== 'production' ? resetUrl : undefined
        });
    } catch (error) {
        next(error);
    }
};

// Reset Password - Use token to set new password
exports.resetPassword = async (req, res, next) => {
    const { token, password } = req.body;

    if (!token || !password) {
        return res.status(400).json({ error: 'Please provide token and new password' });
    }

    try {
        const crypto = require('crypto');
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const connection = await pool.getConnection();
        const [users] = await connection.query(
            'SELECT * FROM users WHERE reset_token = ? AND reset_token_expires > NOW()',
            [hashedToken]
        );

        if (users.length === 0) {
            connection.release();
            return res.status(400).json({ error: 'Invalid or expired reset token' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Update password and clear reset token
        await connection.query(
            'UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?',
            [passwordHash, users[0].id]
        );

        connection.release();

        res.status(200).json({
            success: true,
            message: 'Password has been reset successfully. You can now login with your new password.'
        });
    } catch (error) {
        next(error);
    }
};
