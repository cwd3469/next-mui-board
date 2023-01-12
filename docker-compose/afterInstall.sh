#!/usr/bin/env bash
REPOSITORY=/home/ec2-user/docker-compose

cd $REPOSITORY

$(aws ecr get-login --no-include-email --region ap-northeast-2)

docker-compose rm -fs

docker rmi $(docker images -q)

docker-compose up -d
