const app = require('express')();
const http = require('http').Server(app);

app.set('view engine', 'pug');

app.get('/', function(req, res){
  res.render('chat')
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
