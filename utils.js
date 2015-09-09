var https = require('https');
var _ = require('lodash');
var requests   = require('./requests');
var mail = require('./mail');

var mailOptions = {};

var sendEmailToUser = function(data) {
  mailOptions.to = data.user.profile.email;
  mail.sendMail(mailOptions);
};

var buildEmailMsg = function(data) {
  // Setup e-mail data with unicode symbols
  mailOptions = {
    from: 'Polirytmin Keikkavahvistus <' + process.env.MAIL_ADDRESS + '>', // sender address
    subject: 'Keikkavahvistus: ' + data.channel.name, // Subject line
    html: '<p>Soitto soi ja mörkö maistuu!</p><br><p>Tämä on vahvistusviesti, joka lähetetään kaikille kanavan jäsenille. Olet edelleen kanavalla ja tästä johdosta sinut on valittu kyseisen keikan kokoonpanoon. Mikäli et pysty keikalle osallistumaan, ilmoita siitä Slack:ssä välittömästi ja hoida itsellesi tuuraaja.</p><br><p>**** ENGLISH ****</p><br><p>This is a confirmation email that is send to all Polirytmi members that will participate to this gig. If you can’t participate, send a message in Slack immediately and find a fill-in!</p><br><b>Keikkavahvistus ' + data.channel.name + '</b><br>' + '<p>' + data.channel.latest.purpose + '</p><br><p>- MörköBot</p>' // html body
  };
  _.map(data.channel.members, requests.getMemberEmail);
};

module.exports.buildEmailMsg = buildEmailMsg;
module.exports.sendEmailToUser = sendEmailToUser;
