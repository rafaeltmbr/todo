#!/usr/bin/bash

if [ ! -f nginx/templates/https.conf.template ]; then
  docker run --rm --volume "$(pwd)/certbot/www:/var/www/html:rw" --volume "$(pwd)/certbot/certificate:/etc/letsencrypt:rw" \
  certbot/certbot:latest certonly --webroot -w /var/www/html -d $1 --agree-tos --email $2 -n && \
  mv nginx/templates/https.conf.template_disabled nginx/templates/https.conf.template && \
  docker-compose restart nginx  
fi