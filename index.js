const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');
const sassMiddleware = require('node-sass-middleware');

app.set('view engine', 'ejs');

app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    outputStyle: 'compressed',
    prefix: '/public'
}));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('chat')
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('chat message', function(msg){
    console.log(msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
