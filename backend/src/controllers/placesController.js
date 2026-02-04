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
      SELECT p.id, p.name, p.slug, p.description, c.name as city_name, ph.image_url
      FROM places p
      LEFT JOIN cities c ON p.city_id = c.id
      LEFT JOIN place_photos ph ON p.id = ph.place_id AND ph.is_primary = TRUE
      WHERE p.is_featured = TRUE
      LIMIT 20
    `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getFamousPlaces = async (req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT p.id, p.name, p.slug, p.description, c.name as city_name, ph.image_url
      FROM places p
      LEFT JOIN cities c ON p.city_id = c.id
      LEFT JOIN place_photos ph ON p.id = ph.place_id AND ph.is_primary = TRUE
      ORDER BY RAND()
      LIMIT 20
    `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTopVisitedPlaces = async (req, res) => {
    try {
        // Since user_visits table was removed, return places ordered by id
        const [rows] = await pool.query(`
      SELECT p.id, p.name, p.slug, c.name as city_name, ph.image_url
      FROM places p
      LEFT JOIN cities c ON p.city_id = c.id
      LEFT JOIN place_photos ph ON p.id = ph.place_id AND ph.is_primary = TRUE
      ORDER BY p.id ASC
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


