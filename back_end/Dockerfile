FROM tiangolo/uwsgi-nginx-flask:python3.8-alpine

# General information about the code
LABEL maintainer="SwC <swc@lnls.br>"

ARG SIRIUS_URL_CONFIGDB=http://10.0.38.59/config-db
ARG SIRIUS_URL_CONFIGDB_2=http://10.0.38.46/config-db

WORKDIR /var/www/

COPY . ./app
COPY . .
RUN pip install -r ./requirements.txt

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
