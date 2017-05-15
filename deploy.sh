#!/bin/bash

echo -n "Enter main domain name and press [ENTER]: "
read MG_MAIN_DOMAIN

echo -n "Enter subdomain for mail sending app [mail.$MG_MAIN_DOMAIN]: "
read MG_MAIL_SUBDOMAIN
if [ "$MG_MAIL_SUBDOMAIN" == "" ]; then MG_MAIL_SUBDOMAIN="mail.$MG_MAIN_DOMAIN"; fi
MG_DOCKER_NAME="node_$MG_MAIL_SUBDOMAIN"

echo -n "Enter recipient of emails sent by the app [info@$MG_MAIN_DOMAIN]: "
read MG_RECIPIENT_EMAIL
if [ "$MG_RECIPIENT_EMAIL" == "" ]; then MG_RECIPIENT_EMAIL="info@$MG_MAIN_DOMAIN"; fi

echo -n "Enter Mailgun API key (REQUIRED!): "
read MG_API_KEY
if [ "$MG_API_KEY" == "" ]; then echo "Invalid input, terminating." && exit; fi

echo "Installing dependencies..."

# Install npm packages
docker run -it --rm -v "$PWD":/usr/src/app -w /usr/src/app node:6 npm install

echo "Running mailgun server..."

docker run -d \
  -e "VIRTUAL_HOST=$MG_MAIL_SUBDOMAIN" \
  -e "LETSENCRYPT_HOST=$MG_MAIL_SUBDOMAIN" \
  -e "LETSENCRYPT_EMAIL=$MG_RECIPIENT_EMAIL" \
  -e "DOMAIN=$MG_MAIN_DOMAIN" \
  -e "VIRTUAL_PORT=80" \
  -e "MAILGUN_API_KEY=$MG_API_KEY" \
  -e "ALLOWED_ORIGINS=$MG_MAIN_DOMAIN,www.$MG_MAIN_DOMAIN" \
  -e "EMAIL_RECIPIENT=$MG_RECIPIENT_EMAIL" \
  -e "EMAIL_SUBJECT=A telegraph arrived from " \
  --name "$MG_DOCKER_NAME" -v "$PWD":/usr/src/app -w /usr/src/app node:6 npm start

sleep 2

docker logs $MG_DOCKER_NAME
