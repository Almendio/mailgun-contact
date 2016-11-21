const url = require('url')
const restify = require('restify')
const config = require('./config')
const sendMail = require('./sendMail')

const server = restify.createServer({ name: config.appName })

server.use(restrictAccessToAllowedOrigins)
server.use(restify.CORS({ origins: config.origins }))
server.use(restify.acceptParser(server.acceptable))
server.use(restify.bodyParser())

server.post(config.contactEndpoint, function handleContact (req, res, next) {
  logContactRequest(req)
  if (req.body && req.body.name && req.body.email && req.body.message) {
    sendMail.sendContactMail(req.body.name, req.body.email, req.body.message)
      .then((result) => {
        console.log(result)
        res.send(200)
      })
      .catch((err) => {
        console.error('Error during sending', err, JSON.stringify(err))
        res.send(500)
      })
  } else {
    console.error('Bad request: missing parameters!')
    res.send(400)
  }
  return next()
})

function restrictAccessToAllowedOrigins (req, res, next) {
  const originHostname = url.parse(req.headers.origin).hostname
  let result
  console.log(req.headers.origin)
  if (originHostname && (new RegExp(originHostname)).test(config.allowedOrigins)) {
    result = true
  } else {
    console.error('Unauthorized origin denied to access:', req.headers.origin)
    result = new Error('Unknown error')   // to obfuscate origin error
  }
  return next(result)
}

function logContactRequest (req) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  console.log(new Date(), 'Incoming contact request', ip, "\n", req.headers, "\n", req.body)
}

server.listen(8080, function () {
  console.log(`${server.name} started and listening at ${server.url}`)
  console.log(`Allowed origins:`, config.allowedOrigins.join(', '))
})
