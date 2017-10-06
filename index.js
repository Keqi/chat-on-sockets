const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');
const sassMiddleware = require('node-sass-middleware');

const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');

app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    outputStyle: 'compressed',
    prefix: '/public'
}));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/chat', function(req, res){
  res.render('chat')
});

require('./socket')(app, io);

http.listen(port, function(){
  console.log(`listening on port ${port}`);
});
