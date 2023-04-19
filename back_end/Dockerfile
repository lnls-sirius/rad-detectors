FROM tiangolo/uwsgi-nginx-flask:python3.8-alpine

# General information about the code
LABEL maintainer="SwC <swc@lnls.br>"

WORKDIR /usr/share/nginx/html/

COPY . ./app
COPY . .
RUN pip install -r ./requirements.txt

COPY nginx/nginx.conf /app/nginx.conf

EXPOSE 80
