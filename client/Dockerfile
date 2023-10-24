FROM node as builder

WORKDIR /app

COPY package.json ./

RUN yarn
COPY . .
RUN yarn build
