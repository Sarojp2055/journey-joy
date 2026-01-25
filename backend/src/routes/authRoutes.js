const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/forgot-password/question', authController.getSecurityQuestion);
router.post('/forgot-password/reset', authController.resetPassword);

module.exports = router;
