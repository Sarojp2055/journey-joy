const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

router.use(verifyToken);
router.get('/visits', userController.getMyVisits);
router.get('/favorites', userController.getMyFavorites);

module.exports = router;
