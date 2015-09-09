var https = require('https');
var utils = require('./utils');
var requests = {};

requests.getChannelMembers = function(channelId) {
  var query = '?token=' + process.env.SLACK_TOKEN + '&channel=' + channelId;
  console.log(query);
  https.get("https://slack.com/api/channels.info" + query, function(res) {
    // response body
    res.body = '';
    console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);

    res.on('data', function(chunk) {
      res.body += chunk;
    });
    res.on('end', function() {
      var data = JSON.parse(res.body);
      utils.buildEmailMsg(data);
    })
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
}

module.exports = requests;
