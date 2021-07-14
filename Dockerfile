FROM jansora/spring

ENV version 1.0

RUN mkdir -p /app

COPY ./deploy/entrypoint.sh /app/entrypoint.sh

COPY ./backend/build/libs/easyhtml-0.0.1-SNAPSHOT.jar /app/easyhtml.jar

COPY ./deploy/dependencies/nginx/nginx.conf /etc/nginx/nginx.conf

COPY ./deploy/dependencies/nginx/sites-enabled/app.conf /etc/nginx/sites-enabled/app.conf

COPY ./webapp/main/build /app/dist
ARG ldc

ENV ldc=$ldc

WORKDIR /app

CMD ["sh","-c", "/app/entrypoint.sh"]