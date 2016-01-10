var Q = require('q');
var _ = require('lodash');

var utils = require('./utils');
var Requests = require('./requests');
var MailService = require('./mail');

var sendConfirmationEmail = function (channelId) {
  var deferred = Q.defer();

  var emailBody = {};
  var channelMemberEmails = [];

  Requests.getChannelInfo(channelId).then(function (channelInfo) {
    emailBody = utils.buildEmailMsg(channelInfo);
    utils.getMemberEmails(channelInfo)
    .spread(function () {
      channelMemberEmails = _.map(arguments, function (data) {
        return data.user.profile.email;
      });
      emailBody.to = channelMemberEmails.join(";");
      // Send all the emails
      MailService.sendMail(emailBody);
      return deferred.resolve();
    })
  })
  return deferred.promise;
}

module.exports.sendConfirmationEmail = sendConfirmationEmail;
