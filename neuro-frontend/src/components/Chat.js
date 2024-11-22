import React, { useState, useEffect,useRef } from 'react';
import io from 'socket.io-client';

const ChatScreen = () => {
    const [messages, setMessages] = useState([]); 
    const [input, setInput] = useState('');
    const socketRef = useRef(null);
  
    useEffect(() => {
      socketRef.current = io('http://192.168.1.96:4000', { transports: ['websocket'] });
  
      socketRef.current.on('connect', () => {
        console.log('Connected to the server');
      });
  
      socketRef.current.on('receive_message', (data) => {
        console.log('Received message:', data);
        setMessages((prevMessages) => [...prevMessages, { text: data, sender: 'other' }]);
      });
  
      socketRef.current.on('disconnect', () => {
        console.log('Disconnected from the server');
      });
  
      return () => {
        socketRef.current.disconnect();
      };
    }, []); // Run only once

    const sendMessage = () => {
        if (input.trim()) {
          const message = input;
          console.log('Sending message:', message);
          socketRef.current.emit('send_message', message);
          setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'me' }]);
          setInput('');
        }
      };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {messages.map((message, index) => {
          const isMe = message.sender === 'me';

          return (
            <div key={index} style={{ ...styles.messageContainer, justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
              <div style={{ ...styles.message, backgroundColor: isMe ? '#4f83cc' : '#e6e6e6', color: isMe ? '#fff' : '#000' }}>
                {message.text}
              </div>
            </div>
          );
        })}
      </div>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button style={styles.sendButton} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

// Inline styles remain unchanged
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
  },
  chatBox: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
  },
  messageContainer: {
    display: 'flex',
    marginBottom: '10px',
  },
  message: {
    padding: '10px',
    borderRadius: '10px',
    maxWidth: '60%',
  },
  inputContainer: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    outline: 'none',
  },
  sendButton: {
    marginLeft: '10px',
    padding: '10px 20px',
    backgroundColor: '#4f83cc',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
  },
};

export default ChatScreen;
