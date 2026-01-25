module.exports = async (req, res) => {
    try {
        const mysql = require('mysql2/promise');
        const url = require('url');

        // CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

        // Parse DATABASE_URL
        const dbUrl = new URL(process.env.DATABASE_URL);

        // Create pool
        const pool = mysql.createPool({
            host: dbUrl.hostname,
            port: dbUrl.port || 3306,
            user: dbUrl.username,
            password: dbUrl.password,
            database: dbUrl.pathname.substring(1),
            waitForConnections: true,
            connectionLimit: 1,
            queueLimit: 0,
            ssl: {
                rejectUnauthorized: false
            }
        });

        const [places] = await pool.query(`
            SELECT id, name, description, location, latitude, longitude, 
                   category, image_url, created_at 
            FROM places 
            ORDER BY created_at DESC
            LIMIT 20
        `);

        await pool.end();

        res.status(200).json({
            success: true,
            count: places.length,
            data: places
        });
    } catch (error) {
        console.error('Places API Error:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            code: error.code
        });
    }
};
