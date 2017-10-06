module.exports = function(app, io){
  io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('message', function(msg){
      io.emit('message', msg);
    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });
}
