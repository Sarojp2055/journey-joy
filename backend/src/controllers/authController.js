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
