#!/usr/bin/bash

# Get the ssl certificate:
docker-compose run --rm certbot certonly --webroot -w /var/www/html -d $1 #$1 = host