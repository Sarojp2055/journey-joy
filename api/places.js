const pool = require('../backend/src/config/db');

module.exports = async (req, res) => {
    try {
        // CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

        const [places] = await pool.query(`
            SELECT id, name, description, location, latitude, longitude, 
                   category, image_url, created_at 
            FROM places 
            ORDER BY created_at DESC
        `);

        res.status(200).json({
            success: true,
            count: places.length,
            data: places
        });
    } catch (error) {
        console.error('Places API Error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch places'
        });
    }
};
