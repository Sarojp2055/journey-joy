const express = require('express');
const router = express.Router();
const placesController = require('../controllers/placesController');

// Public
router.get('/', placesController.getAllPlaces);
router.get('/featured', placesController.getFeaturedPlaces);
router.get('/famous', placesController.getFamousPlaces);
// router.get('/top-visited', placesController.getTopVisitedPlaces); // Removed as per request
router.get('/:slug', placesController.getPlaceBySlug);

module.exports = router;
