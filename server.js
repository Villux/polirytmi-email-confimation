// Load env first
var env = require('./env');
var express = require('express');
var bodyParser = require('body-parser');

var Controller = require("./controller");

// App
var app = express();

// Create application/json parser
var jsonParser = bodyParser.json();
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// POST Command from Slack
app.post('/', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log("call from slack channel: " + req.body.channel_id);
  Controller.sendConfirmationEmail(req.body.channel_id).then(function () {
    res.send('Confirmation email sended!');
  }).catch(function (error) {
    console.log("error");
    res.status(400);
    res.send('Process failed.');
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
