const pool = require('../backend/src/config/db');

module.exports = async (req, res) => {
    try {
        // Test database connection
        const [rows] = await pool.query('SELECT 1 as val');

        res.status(200).json({
            status: 'healthy',
            version: '1.0.0-secure',
            database: 'connected',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Database connection failed',
            error: error.message
        });
    }
};
