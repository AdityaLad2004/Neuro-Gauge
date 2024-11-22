const io = require('socket.io')(3000, {
    cors: {
      origin: '*', // Allow CORS for development
    },
  });
  
  io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Listen for 'send_message' event
    socket.on('send_message', (message) => {
      console.log('Message received:', message);
      // Emit the message to all clients except the sender
      socket.broadcast.emit('receive_message', message);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
  