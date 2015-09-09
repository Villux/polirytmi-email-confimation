var express = require('express');
var bodyParser = require('body-parser')
var requests   = require('./requests');
// App
var app = express();

// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function (req, res) {
  res.send('Hello World!');
});


// POST Command from Slack
app.post('/', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  res.send('Your confimartion request is being processed');
  requests.getChannelMembers(req.body.channel_id);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
