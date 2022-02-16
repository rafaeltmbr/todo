#!/usr/bin/bash

# install docker if necessary
which (docker) || ./install-docker.sh

# install docker-compose if necessary
which (docker-compose) || ./install-docker-compose.sh