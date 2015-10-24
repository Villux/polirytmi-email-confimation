var Q = require('q');
var https = require('https');
var utils = require('./utils');


var getChannelInfo = function(channelId) {
  var deferred = Q.defer();

  var query = '?token=' + process.env.SLACK_TOKEN + '&channel=' + channelId;
  https.get("https://slack.com/api/channels.info" + query, function(res) {
    // Response body
    res.body = '';
    res.on('data', function(chunk) {
      res.body += chunk;
    });
    res.on('end', function() {
      console.log("Got channel info: " + res.body);
      return deferred.resolve(JSON.parse(res.body));
    })
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
    deferred.reject("error: " + e);
  });

  return deferred.promise;
};

var getMemberEmail = function(userId) {
  var deferred = Q.defer();

  console.log("GetMemberEmail");

  var query = '?token=' + process.env.SLACK_TOKEN + '&user=' + userId;
  https.get("https://slack.com/api/users.info" + query, function(res) {
    // Response body
    res.body = '';
    res.on('data', function(chunk) {
      res.body += chunk;
    });
    res.on('end', function() {
      return deferred.resolve(JSON.parse(res.body));
    })
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
    deferred.reject("error: " + e);
  });

  return deferred.promise;
};


module.exports.getMemberEmail = getMemberEmail;
module.exports.getChannelInfo = getChannelInfo;
