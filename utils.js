var https = require('https');
var _ = require('lodash');
var mail = require('./mail')

var utils = {};

utils.buildEmailMsg = function(data) {
  console.log(data.channel.latest.purpose);
  mail.sendMail();
};

module.exports = utils;
