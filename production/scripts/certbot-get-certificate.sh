#!/usr/bin/bash

# Get the ssl certificate:
docker-compose run --rm certbot certonly --webroot -w /var/www/html -d api.picode.com.br