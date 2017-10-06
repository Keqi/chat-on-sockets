const users = {};

module.exports = function(app, io){
  io.on('connection', function(socket){
    console.log(`User with ID: ${socket.id} has connected.`);

    // Set initial data for connected user
    users[socket.id] = {}

    // Send information that user has connected
    socket.on('userConnect', function(username){
      io.emit('userConnect', username);
    });

    // Set user data
    socket.on('setData', function(data){
      users[socket.id] = data;
    });

    // Emits information about new username
    socket.on('changeUsername', function(data){
      io.emit('changeUsername', { old_username: data.old_username, new_username: data.new_username });
    });

    // Receives message object and sends it to all users
    socket.on('message', function(msg){
      io.emit('message', msg);
    });

    socket.on('disconnect', function(){
      // Delete user reference and emit message that user has disconnected
      io.emit('userDisconnect', users[socket.id].username)
      delete users[socket.id]
      console.log(`User with ID: ${socket.id} has disconnected.`);
    });
  });
}
