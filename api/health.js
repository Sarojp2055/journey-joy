module.exports = async (req, res) => {
    try {
        const mysql = require('mysql2/promise');

        // Create pool with URL
        const pool = mysql.createPool(process.env.DATABASE_URL);

        // Test connection
        const [rows] = await pool.query('SELECT 1 as val');

        await pool.end();

        res.status(200).json({
            status: 'healthy',
            version: '1.0.0-secure',
            database: 'connected',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Health check error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Database connection failed',
            error: error.message,
            stack: error.stack
        });
    }
};
