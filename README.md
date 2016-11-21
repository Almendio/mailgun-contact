# mailgun-contact
Mailgun-contact provides a simple turn-key backend for any HTML contact forms powered by Mailgun 

This package is a self-contained app that tries to balance between simplicity and flexibility.

This small app is designed by REST principles so it expects an XHR call containing JSON data and returns either a simple 200 code or relevant errors but never renders a thank you page or such.

We can not guarantee further development but PRs are welcomed.

## Installation

Requirements:

* NodeJS 4.x or 6.x (other versions might work as well but not tested)
* NPM 3.x
* Proper registration and setup at Mailgun 
* Properly set domain DNS config
* Any HTML form bound to this app

### Environment variables

Mandatory env vars:

* `DOMAIN`: the domain name you have bound to Mailgun
* `VIRTUAL_PORT`: the port where this app listens to requests
* `MAILGUN_API_KEY`: Mailgun API key that authenticats email sending
* `ALLOWED_ORIGINS`: comma-separated list of the domain names of websites from where you'll receive contact messages
* `EMAIL_RECIPIENT`: the email address where you would like to receive the contact queries

Optional env vars:

* `APP_NAME`: currently not important
* `CONTACT_ENDPOINT`: the default is `/contact`, must begin with a slash
* `EMAIL_SUBJECT`: custom email subject, NOTE: sender's name will be appended
* `EMAIL_TEXT` custom email text intro, NOTE: prefix will be the sender's name, and the message will be appended in a new line

### Install and start

```
npm install
npm start
```

### Frontend setup

The request from the frontend must be a `POST` request to `http://yourdomain.com/CONTACT_ENDPOINT` containing the form data.

`Content-Type` should be set to `application/json; charset=UTF-8`

`Origin` is strictly checked, should be one of the `ALLOWED_ORIGINS`, but it's properly set by the browser.

Necessary **JSON** data to be sent:

```
{  
	"name": "Name of Sender",
	"email": "email@ofthesender.com",
	"message": "The message that they want to send to you"
}
```

#### Important limitation

The current version doesn't support plain HTML form submitting, you have to initiate 

## Thanks

This app is based on [restify](https://github.com/restify/node-restify) and [mailgun-js](https://github.com/bojand/mailgun-js), thanks to their developers.

## Licence

This app is open-source, feel free to use but we can't guarantee anything. MIT Licence applies.
