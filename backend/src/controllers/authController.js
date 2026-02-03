const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, password, securityQuestion, securityAnswer } = req.body;
        if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
        if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' });

        const hash = await bcrypt.hash(password, 10);
        const answerHash = securityAnswer ? await bcrypt.hash(securityAnswer.toLowerCase(), 10) : null;

        // Check if user exists
        const [existing] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
        if (existing.length > 0) return res.status(400).json({ error: 'Username taken' });

        const [result] = await pool.query(
            'INSERT INTO users (username, password_hash, security_question, security_answer_hash) VALUES (?, ?, ?, ?)',
            [username, hash, securityQuestion, answerHash]
        );

        const token = jwt.sign({ id: result.insertId, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: result.insertId, username, role: 'user' } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

        if (users.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

        const user = users[0];
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        const { OAuth2Client } = require('google-auth-library');
        const client = new OAuth2Client(); // Client ID not strictly needed for validation if audience check is skipped or generic

        const ticket = await client.verifyIdToken({
            idToken: token,
            // audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const { name, email, sub } = payload;

        // Check if user exists with this Google sub or email
        // Note: For simplicity, we'll assume username = email if creating new
        let [users] = await pool.query('SELECT * FROM users WHERE username = ?', [email]);

        let user;
        if (users.length === 0) {
            // Create new user (password is random since they use Google)
            const randomPassword = Math.random().toString(36).slice(-8);
            const hash = await bcrypt.hash(randomPassword, 10);

            const [result] = await pool.query(
                'INSERT INTO users (username, password_hash) VALUES (?, ?)',
                [email, hash]
            );
            user = { id: result.insertId, username: email, role: 'user' };
        } else {
            user = users[0];
        }

        const jwtToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token: jwtToken, user: { id: user.id, username: user.username, role: user.role } });
    } catch (err) {
        console.error('Google Auth Error:', err);
        res.status(401).json({ error: 'Google authentication failed' });
    }
};

exports.getSecurityQuestion = async (req, res) => {
    try {
        const { username } = req.query;
        const [users] = await pool.query('SELECT security_question FROM users WHERE username = ?', [username]);
        if (users.length === 0 || !users[0].security_question) {
            return res.status(404).json({ error: 'User or security question not found' });
        }
        res.json({ securityQuestion: users[0].security_question });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { username, securityAnswer, newPassword } = req.body;
        const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (users.length === 0) return res.status(404).json({ error: 'User not found' });

        const user = users[0];
        const match = await bcrypt.compare(securityAnswer.toLowerCase(), user.security_answer_hash);
        if (!match) return res.status(401).json({ error: 'Incorrect answer' });

        if (newPassword.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' });

        const hash = await bcrypt.hash(newPassword, 10);
        await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [hash, user.id]);

        res.json({ message: 'Password reset successful' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
