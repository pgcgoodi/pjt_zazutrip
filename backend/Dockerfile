FROM node:alpine

RUN mkdir server

WORKDIR ./server

COPY . .

RUN npm install

EXPOSE 3001


CMD ["node","server2.js"]

