// routes/authRoutes.js
const express = require('express');
const router = express.Router();
// const authMiddlewares = require('../middlewares/authMiddlewares')
const authController = require('../controllers/userAuthController');
const { authenticate } = require('../middlewares/authMiddlewares');

router.post('/signup', authenticate, authController.signup);
router.post('/login', authenticate, authController.login);
router.get('/logout', authenticate, authController.logout);

module.exports = router;
