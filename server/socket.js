const socket = io => {
  io.on('connection', socket => {
    console.log('User has connect');
    socket.on('disconnect', _ => {
      console.log('User disconnected');
      socket.emit('user-disconnect');
      socket.disconnect();
    });

    socket.on('send_message', data => {
      socket.broadcast.emit('receive_message');
    });
  });
};

export default socket;
