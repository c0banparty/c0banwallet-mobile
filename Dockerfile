FROM nginx:latest

COPY . /mobilewallet

RUN rm -rf /usr/share/nginx/html && \
    ln -s /mobilewallet/cordova/www /usr/share/nginx/html

# CMD ["/sbin/init"]
