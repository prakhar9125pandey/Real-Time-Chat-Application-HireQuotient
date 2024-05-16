const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const chatController = require('../controllers/chatController');

// POST route to send a message
router.post('/send-message', authMiddleware, chatController.sendMessage);

// GET route to fetch messages in a room
router.get('/messages/:room', authMiddleware, chatController.getRoomMessages);

module.exports = router;
