const pool = require('../config/db');

exports.getAllPlaces = async (req, res) => {
    try {
        const { city, category, q } = req.query;

        let query = `
      SELECT p.*, c.name as city_name, cat.name as category_name, ph.image_url 
      FROM places p
      LEFT JOIN cities c ON p.city_id = c.id
      LEFT JOIN categories cat ON p.category_id = cat.id
      LEFT JOIN place_photos ph ON p.id = ph.place_id AND ph.is_primary = TRUE
      WHERE 1=1
    `;
        const params = [];

        if (city) {
            query += ` AND c.name = ?`;
            params.push(city);
        }
        if (category) {
            query += ` AND cat.name = ?`;
            params.push(category);
        }
        if (q) {
            query += ` AND p.name LIKE ?`;
            params.push(`%${q}%`);
        }

        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getFeaturedPlaces = async (req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT p.id, p.name, p.slug, c.name as city_name, ph.image_url
      FROM places p
      LEFT JOIN cities c ON p.city_id = c.id
      LEFT JOIN place_photos ph ON p.id = ph.place_id AND ph.is_primary = TRUE
      WHERE p.is_featured = TRUE
      LIMIT 100
    `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTopVisitedPlaces = async (req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT p.id, p.name, p.slug, COUNT(uv.user_id) as visit_count, ph.image_url
      FROM places p
      LEFT JOIN user_visits uv ON p.id = uv.place_id
      LEFT JOIN place_photos ph ON p.id = ph.place_id AND ph.is_primary = TRUE
      GROUP BY p.id
      ORDER BY visit_count DESC
      LIMIT 50
    `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPlaceBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const [rows] = await pool.query(`
      SELECT p.*, c.name as city_name, cat.name as category_name, ph.image_url 
      FROM places p
      LEFT JOIN cities c ON p.city_id = c.id
      LEFT JOIN categories cat ON p.category_id = cat.id
      LEFT JOIN place_photos ph ON p.id = ph.place_id AND ph.is_primary = TRUE
      WHERE p.slug = ?
    `, [slug]);

        if (rows.length === 0) return res.status(404).json({ error: 'Place not found' });

        const place = rows[0];

        // Fetch hotels in the same city
        const [hotels] = await pool.query(`
          SELECT * FROM hotels WHERE city_id = ?
        `, [place.city_id]);

        console.log(`🔍 Fetched ${hotels.length} hotels for city ${place.city_id} (${place.city_name})`);

        res.json({ ...place, hotels });
    } catch (err) {
        console.error('❌ Error fetching place:', err);
        res.status(500).json({ error: err.message });
    }
};

exports.markVisited = async (req, res) => {
    try {
        const placeId = req.params.id;
        const userId = req.userId;
        await pool.query('INSERT IGNORE INTO user_visits (user_id, place_id) VALUES (?, ?)', [userId, placeId]);
        res.json({ message: 'Marked as visited' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.unmarkVisited = async (req, res) => {
    try {
        const placeId = req.params.id;
        const userId = req.userId;
        await pool.query('DELETE FROM user_visits WHERE user_id = ? AND place_id = ?', [userId, placeId]);
        res.json({ message: 'Unmarked visited' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addToFavorites = async (req, res) => {
    try {
        const placeId = req.params.id;
        const userId = req.userId;
        await pool.query('INSERT IGNORE INTO favorites (user_id, place_id) VALUES (?, ?)', [userId, placeId]);
        res.json({ message: 'Added to favorites' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.removeFromFavorites = async (req, res) => {
    try {
        const placeId = req.params.id;
        const userId = req.userId;
        await pool.query('DELETE FROM favorites WHERE user_id = ? AND place_id = ?', [userId, placeId]);
        res.json({ message: 'Removed from favorites' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
