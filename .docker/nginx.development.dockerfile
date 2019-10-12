FROM nginx:alpine

VOLUME /var/cache/nginx

# Copy custom nginx config
COPY ./.docker/config/nginx.development.conf /etc/nginx/nginx.conf

# Copy custom nginx config
COPY ./public /var/www/public

EXPOSE 80

ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]