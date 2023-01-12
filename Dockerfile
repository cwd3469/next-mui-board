#!/bin/bash
FROM node:16.13.2-alpine

COPY package.json ./
COPY yarn.lock ./
COPY . .

RUN yarn

RUN yarn build

CMD [ "yarn", "start" ]