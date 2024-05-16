const Message = require('../models/message');

// Controller for sending a message
exports.sendMessage = async (req, res) => {
    const { text, room } = req.body;
    const user = req.user.id; // Assuming user ID is attached to the request

    try {
        const newMessage = new Message({
            text,
            user,
            room,
        });

        await newMessage.save();

        res.json(newMessage);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Controller for retrieving messages in a room
exports.getRoomMessages = async (req, res) => {
    const { room } = req.params;

    try {
        const messages = await Message.find({ room }).populate('user', ['email']);

        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Other controllers for additional functionalities can be added here
