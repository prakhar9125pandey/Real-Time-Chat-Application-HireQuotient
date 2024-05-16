const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');


// POST route to register a user
router.post('/register', authController.register);

// POST route to login a user
router.post('/login', authController.login);

module.exports = router;


