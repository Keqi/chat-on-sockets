const users = {};

module.exports = function(app, io){
  io.on('connection', function(socket){
    console.log(`User with ID: ${socket.id} has connected.`);

    // Set initial data for connected user
    users[socket.id] = {}

    // Set user data
    socket.on('setData', function(data){
      users[socket.id] = data;
    });

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
