const users = [];

module.exports = function(app, io){
  io.on('connection', function(socket){
    console.log(`User with ID: ${socket.id} has connected.`);

    // Set initial data for connected user
    users.push({
      id: socket.id,
    })

    socket.on('message', function(msg){
      io.emit('message', msg);
    });

    socket.on('disconnect', function(){
      console.log(`User with ID: ${socket.id} has disconnected.`);
    });
  });
}
