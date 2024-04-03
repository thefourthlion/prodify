#!/bin/sh

# stop and delete container
docker stop prodify-client
docker rm prodify-client

# delete image
docker image rm prodify-client

# pull latest image and run as container
docker build -t prodify-client .

docker run -dp 3000:3000 --name prodify-client prodify-client 