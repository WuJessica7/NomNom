const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/auth.controller.js');
const { authentication } = require('../middleware/auth.middleware.js');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/me', authentication, getMe);

module.exports = router; 