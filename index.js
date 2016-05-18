var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, '/')));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/linear_regression', function(req, res){
  res.sendFile(__dirname + '/pages/linear_regression.html');
});
app.get('/image_processing', function(req, res){
  res.sendFile(__dirname + '/pages/image_processing.html');
});
app.listen(3000);
console.log("Server is listening");

module.exports = app;
