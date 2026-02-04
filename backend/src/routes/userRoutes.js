const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { protect } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

// ==================== FAVORITES ====================

// Get user's favorite places
router.get('/favorites', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT p.id, p.name, p.slug, p.description, c.name as city_name, ph.image_url, uf.created_at as favorited_at
            FROM user_favorites uf
            JOIN places p ON uf.place_id = p.id
            LEFT JOIN cities c ON p.city_id = c.id
            LEFT JOIN place_photos ph ON p.id = ph.place_id AND ph.is_primary = TRUE
            WHERE uf.user_id = ?
            ORDER BY uf.created_at DESC
        `, [req.user.id]);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ error: 'Failed to fetch favorites' });
    }
});

// Add place to favorites
router.post('/favorites/:placeId', async (req, res) => {
    try {
        const { placeId } = req.params;
        await pool.query(
            'INSERT IGNORE INTO user_favorites (user_id, place_id) VALUES (?, ?)',
            [req.user.id, placeId]
        );
        res.json({ success: true, message: 'Added to favorites' });
    } catch (error) {
        console.error('Error adding favorite:', error);
        res.status(500).json({ error: 'Failed to add favorite' });
    }
});

// Remove place from favorites
router.delete('/favorites/:placeId', async (req, res) => {
    try {
        const { placeId } = req.params;
        await pool.query(
            'DELETE FROM user_favorites WHERE user_id = ? AND place_id = ?',
            [req.user.id, placeId]
        );
        res.json({ success: true, message: 'Removed from favorites' });
    } catch (error) {
        console.error('Error removing favorite:', error);
        res.status(500).json({ error: 'Failed to remove favorite' });
    }
});

// ==================== VISITS ====================

// Get user's visited places
router.get('/visits', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT p.id, p.name, p.slug, p.description, c.name as city_name, ph.image_url, uv.visited_at
            FROM user_visits uv
            JOIN places p ON uv.place_id = p.id
            LEFT JOIN cities c ON p.city_id = c.id
            LEFT JOIN place_photos ph ON p.id = ph.place_id AND ph.is_primary = TRUE
            WHERE uv.user_id = ?
            ORDER BY uv.visited_at DESC
        `, [req.user.id]);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching visits:', error);
        res.status(500).json({ error: 'Failed to fetch visits' });
    }
});

// Mark place as visited
router.post('/visits/:placeId', async (req, res) => {
    try {
        const { placeId } = req.params;
        await pool.query(
            'INSERT IGNORE INTO user_visits (user_id, place_id) VALUES (?, ?)',
            [req.user.id, placeId]
        );
        res.json({ success: true, message: 'Marked as visited' });
    } catch (error) {
        console.error('Error marking visited:', error);
        res.status(500).json({ error: 'Failed to mark as visited' });
    }
});

// Remove visited status
router.delete('/visits/:placeId', async (req, res) => {
    try {
        const { placeId } = req.params;
        await pool.query(
            'DELETE FROM user_visits WHERE user_id = ? AND place_id = ?',
            [req.user.id, placeId]
        );
        res.json({ success: true, message: 'Removed visited status' });
    } catch (error) {
        console.error('Error removing visited:', error);
        res.status(500).json({ error: 'Failed to remove visited status' });
    }
});

// ==================== STATS ====================

// Get user's visit statistics per city
router.get('/stats', async (req, res) => {
    try {
        // Get total places per city
        const [totalPerCity] = await pool.query(`
            SELECT c.id as city_id, c.name as city_name, COUNT(p.id) as total_places
            FROM cities c
            LEFT JOIN places p ON c.id = p.city_id
            GROUP BY c.id, c.name
        `);

        // Get user's visited places per city
        const [visitedPerCity] = await pool.query(`
            SELECT c.id as city_id, c.name as city_name, COUNT(uv.id) as visited_places
            FROM cities c
            LEFT JOIN places p ON c.id = p.city_id
            LEFT JOIN user_visits uv ON p.id = uv.place_id AND uv.user_id = ?
            GROUP BY c.id, c.name
        `, [req.user.id]);

        // Combine data
        const stats = totalPerCity.map(city => {
            const visited = visitedPerCity.find(v => v.city_id === city.city_id);
            const visitedCount = visited ? visited.visited_places : 0;
            const percentage = city.total_places > 0
                ? Math.round((visitedCount / city.total_places) * 100)
                : 0;
            return {
                city: city.city_name,
                total: city.total_places,
                visited: visitedCount,
                percentage
            };
        });

        // Get overall stats
        const [overallTotal] = await pool.query('SELECT COUNT(*) as count FROM places');
        const [overallVisited] = await pool.query(
            'SELECT COUNT(*) as count FROM user_visits WHERE user_id = ?',
            [req.user.id]
        );
        const [overallFavorites] = await pool.query(
            'SELECT COUNT(*) as count FROM user_favorites WHERE user_id = ?',
            [req.user.id]
        );

        res.json({
            cities: stats,
            overall: {
                totalPlaces: overallTotal[0].count,
                visitedPlaces: overallVisited[0].count,
                favorites: overallFavorites[0].count,
                percentage: overallTotal[0].count > 0
                    ? Math.round((overallVisited[0].count / overallTotal[0].count) * 100)
                    : 0
            }
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

// Get user's favorite and visit status for a specific place
router.get('/place-status/:placeId', async (req, res) => {
    try {
        const { placeId } = req.params;

        const [favorite] = await pool.query(
            'SELECT id FROM user_favorites WHERE user_id = ? AND place_id = ?',
            [req.user.id, placeId]
        );

        const [visited] = await pool.query(
            'SELECT id FROM user_visits WHERE user_id = ? AND place_id = ?',
            [req.user.id, placeId]
        );

        res.json({
            isFavorite: favorite.length > 0,
            isVisited: visited.length > 0
        });
    } catch (error) {
        console.error('Error fetching place status:', error);
        res.status(500).json({ error: 'Failed to fetch place status' });
    }
});

module.exports = router;
