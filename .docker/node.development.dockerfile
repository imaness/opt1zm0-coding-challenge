FROM node:alpine

LABEL author="Emman Soriano"

WORKDIR /var/www/optizmo

RUN npm install -g pm2@latest

RUN mkdir -p /var/log/pm2

EXPOSE 		8080

ENTRYPOINT ["pm2", "start", "app.js","--name","optizmo","--log","/var/log/pm2/pm2.log","--watch","--no-daemon"]