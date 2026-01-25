module.exports = async (req, res) => {
    try {
        const mysql = require('mysql2/promise');
        const url = require('url');

        // Parse DATABASE_URL
        const dbUrl = new URL(process.env.DATABASE_URL);

        // Create pool with parsed config
        const pool = mysql.createPool({
            host: dbUrl.hostname,
            port: dbUrl.port || 3306,
            user: dbUrl.username,
            password: dbUrl.password,
            database: dbUrl.pathname.substring(1), // Remove leading /
            waitForConnections: true,
            connectionLimit: 1,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
            ssl: {
                rejectUnauthorized: false // Aiven uses self-signed certs
            }
        });

        // Test connection
        const [rows] = await pool.query('SELECT 1 as val');

        await pool.end();

        res.status(200).json({
            status: 'healthy',
            version: '1.0.0-secure',
            database: 'connected',
            db_host: dbUrl.hostname,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Health check error:', error);
        res.status(500).json({
            status: 'error',
            message: error.message,
            code: error.code,
            errno: error.errno
        });
    }
};
