//Install express server
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static( __dirname + '/dist'));

// app.get('/*', function(req,res) {
//
// res.sendFile(path.join(__dirname,'/dist/your_app_name/index.html'));
// });

app.get('/', function(req, res){
  res.sendFile(__dirname + '/dist/index.html');
});
app.get('/visualizer', function(req, res){
  res.sendFile(__dirname + '/dist/index.html');
});
app.get('/simulator', function(req, res){
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(process.env.PORT || 8080);
