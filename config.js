module.exports = {
  appName: process.env.APP_NAME || 'Email contact API',
  domain: process.env.DOMAIN || 'example.com',
  allowedOrigins: (process.env.ALLOWED_ORIGINS || 'https://example.com,http://example.com').split(','),  // CORS settings
  contactEndpoint: process.env.CONTACT_ENDPOINT || '/contact',
  apiPort: process.env.VIRTUAL_PORT || 8080,    // NOTE: VIRTUAL_PORT is also used by nginx-proxy
  mailgunApiKey: process.env.MAILGUN_API_KEY || 'key-000set000your000key000here000',
  email: {
    recipient: process.env.EMAIL_RECIPIENT || 'info@example.com',
    subject: process.env.EMAIL_SUBJECT || 'Contact from ',    // NOTE: sender's name will be appended
    text: process.env.EMAIL_TEXT || 'sent the following message:'    // NOTE: prefix will be the sender's name, and the message will be appended in a new line
  }
}
