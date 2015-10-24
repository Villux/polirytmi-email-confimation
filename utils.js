var https = require('https');
var _ = require('lodash');
var Requests = require('./requests');
var Q = require('q');


var getMemberEmails = function(channelInfo) {
  console.log("Get member emails");
  return Q.all(_.map(channelInfo.channel.members, Requests.getMemberEmail));
};

var buildEmailMsg = function(data) {
  // Setup e-mail data with unicode symbols
  return mailOptions = {
    from: 'Polirytmin Keikkavahvistus <' + process.env.MAIL_ADDRESS + '>', // sender address
    subject: 'Keikkavahvistus kanavalta: ' + data.channel.name, // Subject line
    html: '<p>Soitto soi ja mörkö maistuu!</p><br><p>Tämä on vahvistusviesti, joka lähetetään kaikille kanavan jäsenille. Olet edelleen kanavalla ja tästä johdosta sinut on valittu kyseisen keikan kokoonpanoon. Mikäli et pysty keikalle osallistumaan, ilmoita siitä Slack:ssä välittömästi ja hoida itsellesi tuuraaja.</p><br><p>**** ENGLISH ****</p><br><p>This is a confirmation email that is send to all Polirytmi members that will participate to this gig. If you can’t participate, send a message in Slack immediately and find a fill-in!</p><br><b>Keikkavahvistus ' + data.channel.name + '</b><br>' + '<p>' + data.channel.latest.purpose + '</p><br><p>- MörköBot</p>' // html body
  };
};

module.exports.buildEmailMsg = buildEmailMsg;
module.exports.getMemberEmails = getMemberEmails;
