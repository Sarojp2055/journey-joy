const pool = require('../config/db');

exports.getMyVisits = async (req, res) => {
    try {
        const userId = req.userId;
        const [rows] = await pool.query(`
      SELECT p.*, c.name as city_name, uv.visited_at 
      FROM user_visits uv
      JOIN places p ON uv.place_id = p.id
      LEFT JOIN cities c ON p.city_id = c.id
      WHERE uv.user_id = ?
      ORDER BY uv.visited_at DESC
    `, [userId]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMyFavorites = async (req, res) => {
    try {
        const userId = req.userId;
        const [rows] = await pool.query(`
      SELECT p.*, c.name as city_name
      FROM favorites f
      JOIN places p ON f.place_id = p.id
      LEFT JOIN cities c ON p.city_id = c.id
      WHERE f.user_id = ?
      ORDER BY f.created_at DESC
    `, [userId]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
