var config = require('./config')

if (config.mailgunApiKey === 'key-000set000your000key000here000') {
  throw Error('You must set your own Mailgun API key in order to use this app.')
}

var mailgun = require('mailgun-js')({apiKey: config.mailgunApiKey, domain: config.domain})

module.exports.sendContactMail = function sendContactMail (senderName, senderEmail, message) {
  return new Promise(function (resolve, reject) {
    var data = {
      from: senderName + ' <' + senderEmail + '>',
      to: config.email.recipient,
      subject: config.email.subject + senderName,
      text: `${senderName} ${config.email.text}

${message}`
    }
    mailgun.messages().send(data, function (error, body) {
      if (error) {
        reject(error)
      } else {
        resolve(body.message)
      }
    })
  })
}
