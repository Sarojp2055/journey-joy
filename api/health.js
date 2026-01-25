module.exports = async (req, res) => {
    try {
        const mysql = require('mysql2/promise');

        // Try direct connection string first
        let pool;
        try {
            // Method 1: Direct string
            pool = mysql.createPool({
                uri: process.env.DATABASE_URL
            });
        } catch (e1) {
            // Method 2: As connectionString
            try {
                pool = mysql.createPool(process.env.DATABASE_URL);
            } catch (e2) {
                return res.status(500).json({
                    error: 'Pool creation failed',
                    method1_error: e1.message,
                    method2_error: e2.message,
                    url_length: process.env.DATABASE_URL.length
                });
            }
        }

        const [rows] = await pool.query('SELECT 1 as val');
        await pool.end();

        res.status(200).json({
            status: 'healthy',
            database: 'connected',
            result: rows[0]
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            code: error.code,
            stack: error.stack
        });
    }
};
