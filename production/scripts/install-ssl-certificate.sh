#!/usr/bin/bash

if [ ! -f nginx/templates/https.conf.template ]; then
  docker-compose run --rm certbot certonly --webroot -w /var/www/html -d $1 --agree-tos --email $2 -n && \
  mv nginx/templates/https.conf.template_disabled nginx/templates/https.conf.template && \
  docker-compose restart nginx  
fi