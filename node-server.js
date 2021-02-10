var express = require('express');
var http = require('http');

var app = express();

app.set('view engine', 'pug');
app.set('views', './');

app.use('/texture', express.static(__dirname + '/texture'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/style', express.static(__dirname + '/style'));

app.get("/", (req, res) => {
  res.render('index.pug');
})

var httpServer = http.createServer(app);
httpServer.listen(80);