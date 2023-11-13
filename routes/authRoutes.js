// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/userAuthController');
const { authenticate } = require('../middlewares/authMiddlewares');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authenticate, authController.logout);

module.exports = router;
