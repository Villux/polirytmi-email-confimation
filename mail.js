var nodemailer = require('nodemailer');
var generator = require('xoauth2').createXOAuth2Generator({
  user: process.env.MAIL_ADDRESS,
  clientId: process.env.MAIL_CLIENT_ID,
  clientSecret: process.env.MAIL_CLIENT_SECRET,
  refreshToken: process.env.MAIL_REFRESH_TOKEN
});

generator.on('token', function(token){
  console.log('New token for %s: %s', token.user, token.accessToken);
});

var mail = {};
// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        xoauth2: generator
    }
});

// No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Teuvo Testaaja ✔ <' + process.env.MAIL_ADDRESS + '>', // sender address
    to: process.env.MAIL_TEST_ADDRESS, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};

mail.sendMail = function() {
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.log('error');
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);

  });
}


module.exports = mail;
