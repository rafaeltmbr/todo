#!/usr/bin/bash

# install docker if necessary
which docker || sudo ./install-docker.sh

# install docker-compose if necessary
which docker-compose || sudo ./install-docker-compose.sh