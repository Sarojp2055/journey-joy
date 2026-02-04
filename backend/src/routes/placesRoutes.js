const express = require('express');
const router = express.Router();
const placesController = require('../controllers/placesController');

// Public
router.get('/', placesController.getAllPlaces);
router.get('/featured', placesController.getFeaturedPlaces);
router.get('/top-visited', placesController.getTopVisitedPlaces);
router.get('/:slug', placesController.getPlaceBySlug);

module.exports = router;
