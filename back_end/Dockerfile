FROM tiangolo/uwsgi-nginx-flask:python3.8-alpine

# General information about the code
LABEL maintainer="SwC <swc@lnls.br>"

WORKDIR /usr/share/nginx/html/

COPY . ./app
COPY . .
RUN pip install -r ./requirements.txt

RUN rm /etc/nginx/conf.d/*
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
