const express = require('express');
const router = express.Router();
const placesController = require('../controllers/placesController');
const { verifyToken } = require('../middleware/authMiddleware');

// Public
router.get('/', placesController.getAllPlaces);
router.get('/featured', placesController.getFeaturedPlaces);
router.get('/top-visited', placesController.getTopVisitedPlaces);
router.get('/:slug', placesController.getPlaceBySlug);

// Protected
router.post('/:id/visit', verifyToken, placesController.markVisited);
router.delete('/:id/visit', verifyToken, placesController.unmarkVisited);
router.post('/:id/favorite', verifyToken, placesController.addToFavorites);
router.delete('/:id/favorite', verifyToken, placesController.removeFromFavorites);

module.exports = router;
