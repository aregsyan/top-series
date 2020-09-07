#!/bin/bash

CONTAINER="top-series-db"
set -a
source .env
set +a

mkdir -p top_series_data && \
docker stop $CONTAINER  || true && docker rm $CONTAINER || true && \
docker run \
    -v "$(pwd)"/top_series_data/mongodb:/data/db \
    -v "$(pwd)"/top_series_data/logs:/var/log/mongodb \
    -v "$(pwd)"/db/mongod.conf:/etc/mongod.conf:ro \
    -v "$(pwd)"/db:/docker-entrypoint-initdb.d \
    -p 27017:27017 \
    -d --name $CONTAINER \
    --env-file .env mongo:latest
