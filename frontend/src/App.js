import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:3000');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState('general');
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const username = prompt('Enter your name:');
    setCurrentUser(username);

    socket.emit('join', { name: username, room }, () => { });

    return () => {
      socket.disconnect();
    };
  }, [room]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('roomData', ({ users }) => {
      console.log(users);
    });
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/chat/messages/${room}`);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1>Welcome {currentUser}</h1>
      <h2>Room: {room}</h2>
      <div>
        <button onClick={() => setRoom('general')}>General</button>
        <button onClick={() => setRoom('random')}>Random</button>
      </div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
      <button onClick={fetchMessages}>Fetch Messages</button>
    </div>
  );
}

export default App;
