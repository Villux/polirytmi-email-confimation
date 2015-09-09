var https = require('https');
var utils = require('./utils');


var getChannelMembers = function(channelId) {
  var query = '?token=' + process.env.SLACK_TOKEN + '&channel=' + channelId;
  https.get("https://slack.com/api/channels.info" + query, function(res) {
    // Response body
    res.body = '';
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
};

var getMemberEmail = function(userId) {
  var query = '?token=' + process.env.SLACK_TOKEN + '&user=' + userId;
  https.get("https://slack.com/api/users.info" + query, function(res) {
    // Response body
    res.body = '';
    res.on('data', function(chunk) {
      res.body += chunk;
    });
    res.on('end', function() {
      var data1 = JSON.parse(res.body);
      utils.sendEmailToUser(data1);
    })
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
};

module.exports.getMemberEmail = getMemberEmail;
module.exports.getChannelMembers = getChannelMembers;
